const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
   name: {
      type: String
   },
   category: {
      type: String
   },
   desc: {
      type: String
   },
   price: {
      type: Number
   },
   image: {
      type: String
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
