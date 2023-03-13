import mongoose from "mongoose";

const jokeSchema = new mongoose.Schema({
   text: {
      type: String,
      required: true,
   },
   creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
   },
});

const Joke = mongoose.model("Joke", jokeSchema);

export default Joke;
