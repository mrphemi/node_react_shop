const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   category: {
      type: String,
      required: true
   },
   desc: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
