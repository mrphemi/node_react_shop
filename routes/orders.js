import express from "express";

const router = express.Router();

import { getAllOrders, createOrder, deleteOrder } from "../controllers/order";

// @route   GET /orders
// @desc    Retrieve all orders
// @access  Private
router.get("/", getAllOrders);

// @route   POST /orders
// @desc    Create new order
// @access  Private
router.post("/", createOrder);

// @route   DELETE /orders
// @desc    delete order
// @access  Private
router.delete("/:orderId", deleteOrder);

export default router;
