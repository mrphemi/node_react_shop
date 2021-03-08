import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const sizeSchema = new Schema({
  quantity: {
    type: Number,
    default: 1,
  },
  size: { type: ObjectId, ref: "Size" },
});

const productSchema = new Schema(
  {
    name: String,
    category: {
      type: ObjectId,
      ref: "Category",
      autopopulate: { select: "name" },
    },
    description: String,
    price: Number,
    brand: {
      type: ObjectId,
      ref: "Brand",
      autopopulate: { select: "name" },
    },
    availableSizes: [sizeSchema],
    image: String,
    image_id: String,
  },
  { timestamps: true },
);

productSchema.plugin(autopopulate);

const Product = mongoose.model("Product", productSchema);

export default Product;
