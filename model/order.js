import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
   },
   product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true
   },
   quantity: {
      type: Number,
      default: 1
   }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
