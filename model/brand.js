import mongoose from "mongoose";

const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true },
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
