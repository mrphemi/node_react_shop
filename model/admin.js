import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config";

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    phone: Number,
    password: String,
    role: {
      type: String,
      default: "admin",
      immutable: true
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
AdminSchema.pre("save", function() {
  this.password = bcrypt.hashSync(this.password);
});

/**
 * Compare password with user's hashed password on file.
 *
 * @return {boolean}
 */
AdminSchema.methods.comparePasswords = function(password) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Generate a jwt for this user.
 *
 * @return {string}
 */
AdminSchema.methods.generateToken = function() {
  const userInfo = {
    id: this._id,
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name
  };
  return jwt.sign(userInfo, config.jwtSecret, { expiresIn: "7d" });
};

const Admin = mongoose.model("User", AdminSchema);

export default Admin;
