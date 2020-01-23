import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config";

const Schema = mongoose.Schema;

// Account type : 0 for regular user, 1 for admin

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    accountType: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

/**
 * Hash and save the user's password before
 * saving to the database
 *
 * @return {null}
 */
UserSchema.pre("save", function() {
  this.password = bcrypt.hashSync(this.password);
});

/**
 * Compare password with user's hashed password on file.
 *
 * @return {boolean}
 */
UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Generate a jwt for this user.
 *
 * @return {string}
 */
UserSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id }, config.jwtSecret);
};

const User = mongoose.model("user", UserSchema);

export default User;
