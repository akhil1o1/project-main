import * as dotenv from "dotenv";
dotenv.config();
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import HttpError from "../Models/http-error.js";
import User from "../Models/user-model.js";

// sign up controller
export const signup = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      // to check validation errors from express validators
      return next(
         new HttpError("Invalid user input. please check your data.", 422)
      );
   }

   const { name, email, password } = req.body;
   console.log(name, email, password);

   let userAlreadyExists;
   try {
      userAlreadyExists = await User.findOne({ email: email });
   } catch (error) {
      return next(
         new HttpError("Signing up failed, please try again later 1.", 500)
      );
   }

   if (userAlreadyExists) {
      return next(
         new HttpError("User already exists, Please login instead.", 422)
      );
   }

   let hashedPassword;
   try {
      // hashing and salting password, 6 => 6 rounds of salting
      hashedPassword = await bcrypt.hash(password, 6);
   } catch (error) {
      return next(
         new HttpError("Signing up failed, please try again later 2.", 500)
      );
   }

   const newUser = new User({
      name,
      email,
      password: hashedPassword,
      jokes: [], //jokes will get populated with jokeIds of jokes created by user.
   });

   let createdUser;
   try {
      createdUser = await newUser.save();
   } catch (error) {
      console.log(error);
      return next(
         new HttpError("Signing up failed. Please try again later 3.", 500)
      );
   }

   let token;
   try {
      //creating jwt token
      token = jwt.sign(
         {
            userId: createdUser.id,
            email: createdUser.email,
            name: createdUser.name,
         }, // data to be encoded in token
         process.env.JWT_TOKEN_KEY, // secret string/key
         { expiresIn: "1h" } // token expiration time
      );
   } catch (error) {
      return next(
         new HttpError("Signing up failed. Please try again later 4.", 500)
      );
   }

   res.status(201).json({
      userId: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      role: createdUser.role,
      token,
   }); // sending token along with other data.
};

//login controller
export const login = async (req, res, next) => {
   const { email, password } = req.body;

   let matchedUser;
   try {
      matchedUser = await User.findOne({ email: email });
   } catch (error) {
      return next(new HttpError("Login failed, please try again later.", 500));
   }

   if (!matchedUser) {
      return next(
         new HttpError("Email does not exist, please sign up instead.", 401)
      );
   }

   let isValidPassword;
   try {
      // comparing entered password to hashed password in db.
      isValidPassword = await bcrypt.compare(password, matchedUser.password); // returns a boolean
   } catch (error) {
      return next(new HttpError("Login failed, please try again later.", 500));
   }

   if (!isValidPassword) {
      return next(
         new HttpError(
            "Wrong password, please check your password and try again.",
            401
         )
      );
   }

   let token;
   try {
      token = jwt.sign(
         {
            userId: matchedUser.id,
            email: matchedUser.email,
            name: matchedUser.name,
         },
         process.env.JWT_TOKEN_KEY,
         { expiresIn: "1h" }
      );
   } catch (error) {
      return next(new HttpError("Login failed, please try again later", 500));
   }

   res.json({
      userId: matchedUser.id,
      email: matchedUser.email,
      name: matchedUser.name,
      role: matchedUser.role,
      token,
   });
};
