import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
   },
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

export default Product;
