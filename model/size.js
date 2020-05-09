import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sizeSchema = new Schema(
  {
    size: Number,
  },
  { timestamps: true },
);

const Size = mongoose.model("Size", sizeSchema);

export default Size;
