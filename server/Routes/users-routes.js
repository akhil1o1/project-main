import { Router } from "express";
import { body } from "express-validator";

import { signup, login } from "../Controllers/users-controllers.js";

const router = Router();

router.post(
  "/signup",
  [
    body("name").trim().not().isEmpty(),
    body("email").trim().normalizeEmail().isEmail(), // normalize email => Test@test.com => test@test.com
    body("password").trim().isLength({ min: 6 }),
    body("role").trim().not().isEmpty(),
  ],
  signup
);

router.post("/login", login);

export default router;
