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

router.get("/jokes", getJokes);

// router.use(checkAuth); // middleware to check authentication and protect subsequent routes.

router.post(
   "/jokes",
   [
      body("text").trim().not().isEmpty(), // middlewares to validate requests
      body("creator").trim().not().isEmpty(),
   ],
   createJoke
);

router.patch("/:jokeId", [body("text").trim().not().isEmpty()], updateJoke);

router.delete("/:jokeId", deleteJoke);

export default router;
