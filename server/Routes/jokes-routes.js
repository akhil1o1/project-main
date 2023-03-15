import { Router } from "express";
import { body } from "express-validator";
import {
   getJokes,
   createJoke,
   updateJoke,
   deleteJoke,
} from "../Controllers/jokes-controllers.js";
import checkAuth from "../Middleware/check-auth.js";

const router = Router();

router.get("/", getJokes);

router.use(checkAuth); // middleware to check authentication and protect subsequent routes.

router.post(
   "/newJoke",
   [
      body("text").trim().not().isEmpty(), // middlewares to validate requests data
   ],
   createJoke
);

router.patch("/editJoke/:jokeId", [body("text").trim().not().isEmpty()], updateJoke);

router.delete("/deleteJoke/:jokeId", deleteJoke);

export default router;
