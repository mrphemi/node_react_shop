import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: String
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);

export default Category;
