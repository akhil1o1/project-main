import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import HttpError from "./Models/http-error.js";
import jokeRooutes from "./Routes/jokes-routes.js";
import userRoutes from "./Routes/users-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/jokes", jokeRooutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
   //in case the route does not match any of the above
   throw new HttpError("Could not find the route.", 404);
});

//middleware for error handling for all requests.
app.use((error, req, res, next) => {
   res.status(error.code || 500).json({
      message: error.message || "An unknown error occurred!",
   });
});

mongoose.set("strictQuery", false);
mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => {
      app.listen(process.env.PORT);
      console.log(
         `DB connected and server is listening at port ${process.env.PORT}`
      );
   })
   .catch((error) => console.log(error));
