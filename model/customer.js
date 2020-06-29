import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../config";

const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    phone: Number,
    role: {
      type: String,
      default: "Customer",
      immutable: true,
    },
  },
  { timestamps: true },
);

/**
 * Hash and save the user's password before
 * saving to the database
 *
 * @return {null}
 */
CustomerSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password);
});

/**
 * Compare password with user's hashed password on file.
 *
 * @return {boolean}
 */
CustomerSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, this.password);
};

/**
 * Generate a jwt for this user.
 *
 * @return {string}
 */
CustomerSchema.methods.generateToken = function () {
  const userInfo = {
    id: this._id,
    email: this.email,
    first_name: this.first_name,
    last_name: this.last_name,
    role: this.role,
  };
  return jwt.sign(userInfo, config.jwtSecret, { expiresIn: "7d" });
};

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
