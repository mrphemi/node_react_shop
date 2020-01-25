import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const productSchema = new Schema(
  {
    name: String,
    category: ObjectId,
    desc: String,
    price: Number,
    image: String,
    imageId: String
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

export default Product;
