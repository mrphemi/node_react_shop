const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
   fullName: {
      type: String
   },
   userName: {
      type: String
   },
   email: {
      type: String
   },
   password: {
      type: String
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const User = mongoose.model("product", userSchema);

module.exports = User;
