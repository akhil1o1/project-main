import { validationResult } from "express-validator";
import mongoose from "mongoose";

import HttpError from "../Models/http-error.js";
import Joke from "../Models/joke-model.js";
import User from "../Models/user-model.js";

export const getJokes = async (req, res, next) => {
   let jokes;
   try {
      jokes = await Joke.find();
   } catch (error) {
      return next(
         new HttpError("Fetching Jokes failed. Please try again later", 500)
      );
   }

   res.json({ jokes: jokes.map((joke) => joke.toObject({ getters: true })) }); // will add an id field along with _id before sending the response.
};

export const createJoke = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      // to check validation errors from express validators
      return next(
         new HttpError("Invalid user input. please check your data.", 422)
      );
   }

   const { text } = req.body;
   const creator = req.userId; // currently logged in user's id
   const creatorName = req.userName; // currently logged in user's name

   console.log("creator", creator);
   console.log("creatorName", creatorName);

   const newJoke = new Joke({
      text,
      creatorName,
      creator,
   });

   let user;
   try {
      //checking if user with creatorID exists
      user = await User.findById(creator);
   } catch (error) {
      return next(
         new HttpError(
            "Could not create the joke, please try again later.",
            500
         )
      );
   }

   if (!user) {
      return next(
         new HttpError("Could not find the user for provided Id", 404)
      );
   }

   console.log(user);

   let createdJoke;
   try {
      // starting session and performing transactions / unrelated operations
      const sess = await mongoose.startSession();
      sess.startTransaction(); //starting transactions.
      createdJoke = await newJoke.save({ session: sess }); //making this operation part of the session

      user.jokes.push(createdJoke);
      await user.save({ session: sess }); //making this operation part of the session
      await sess.commitTransaction(); // saving changes if all the operation are successful otherwise it will undo the changes made to documents if any of the operation that is part of the session fails.
   } catch (error) {
      return next(
         new HttpError(
            "Could not create the joke, please try again later.",
            500
         )
      );
   }

   res.status(201).json({ joke: createdJoke.toObject({ getters: true }) });
};

export const updateJoke = async (req, res, next) => {
   const { jokeId } = req.params;

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return next(
         new HttpError("Invalid user input. please check your data.", 422)
      );
   }

   const { text } = req.body;

   let jokeToBeUpdated;
   try {
      jokeToBeUpdated = await Joke.findById(jokeId);
   } catch (error) {
      return next(
         new HttpError(
            "Could not update the joke, please try again later.",
            500
         )
      );
   }

   if (!jokeToBeUpdated) {
      return next(
         new HttpError("Could not find the joke for provided joke id.", 404)
      );
   }

   // checking below if the creator of the joke is same as the user currently logged in. thus making sure a user can delete the joke only if it was created by him.
   // userId added to request by checkAuth middleware after extracting it from authorization header token.
   // creator is of mongoose type objectId so needs to be converted to string to compare with userId
   if (jokeToBeUpdated.creator.toString() !== req.userId) {
      return next(
         new HttpError(
            "Authentication failed!!! you are not allowed to edit joke.",
            401
         )
      );
   }

   // updating joke with new text.
   jokeToBeUpdated.text = text;

   let updatedJoke;
   try {
      updatedJoke = await jokeToBeUpdated.save();
   } catch (error) {
      return next(
         new HttpError(
            "Could not update the joke, please try again later.",
            500
         )
      );
   }

   res.status(200).json({ joke: updatedJoke.toObject({ getters: true }) });
};

export const deleteJoke = async (req, res, next) => {
   const { jokeId } = req.params;
   const userId = req.userId; // userId of currently logged in user

   let user;
   try {
      //checking if currently loggedIn user is Admin to allow deleting any joke
      user = await User.findById(userId);
   } catch (error) {
      return next(
         new HttpError(
            "Could not delete the joke, please try again later.",
            500
         )
      );
   }

   if (!user) {
      return next(
         new HttpError(
            "Authentication failed!!! you are not allowed to delete this joke.",
            404
         )
      );
   }

   let userIsAdmin = user.role === "admin";
   console.log("userIsAdmin", userIsAdmin);

   //deleting it in 2 steps to be able to use populate method instead of using findByIdAndDelete to delete in 1 step.
   let joke;
   try {
      joke = await Joke.findById(jokeId).populate("creator"); // gives access to user document with id===creator
   } catch (error) {
      return next(
         new HttpError("Something went wrong, please try again later.", 500)
      );
   }

   if (!joke) {
      return next(
         new HttpError("Could not find the joke for provided joke id.", 404)
      );
   }

   // joke.creator will be populated with the entire creator/user document with id(string) along with _id(objectId) field.
   //so joke.creator.toString() !== req.userId comparison wont work thus comparing the id of the creator/user document with userId
   if (!userIsAdmin && joke.creator.id !== req.userId) {
      //if user is neither admin nor creator
      return next(
         new HttpError(
            "Authentication failed!!! you are not allowed to delete this joke.",
            401
         )
      );
   }

   try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await Joke.findByIdAndRemove({ _id: jokeId }, { session: sess });
      joke.creator.jokes.pull(joke); // it will remove the jokeId from jokes array in user document. it is possible due to populate method.
      await joke.creator.save({ session: sess });
      await sess.commitTransaction();
   } catch (error) {
      return next(
         new HttpError(
            "Could not delete the joke, please try again later.",
            500
         )
      );
   }

   res.status(200).json({ message: "Deleted joke successfully." });
};
