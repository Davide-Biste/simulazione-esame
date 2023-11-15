import mongoose from "mongoose";
import {
  checkPassword,
  hashPassword,
} from "../../services/passwordCrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.checkPassword = function (password) {
  return checkPassword(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const { passwordToSave } = await hashPassword(this.password);
  this.password = passwordToSave;
  next();
});

export default mongoose.model("User", userSchema, "user");
