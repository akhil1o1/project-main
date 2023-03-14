import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      index: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      minLength: 6,
   },
   role: {
      type: String,
      required: true,
      default: "user"
   },
   jokes: [{ type: mongoose.Types.ObjectId,  ref: "Joke" }], //an array of documents. with every document having a type of mongoose ObjectId(id of the related Joke document). Making relation to Joke model
});

userSchema.plugin(uniqueValidator); /// to validate emails and prevent email duplication for users

const User = mongoose.model("User", userSchema);

export default User;
