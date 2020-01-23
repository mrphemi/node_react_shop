import mongoose from "mongoose";
import Product from "./product";
const Schema = mongoose.Schema;

const orderSchema = new Schema({ firstName: String }, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
