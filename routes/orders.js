const express = require("express");
const router = express.Router();

const Order = require("../model/order");
const Product = require("../model/product");

// @route   GET /orders
// @desc    Retrieve all orders
// @access  Private
router.get("/", (req, res) => {
   // Get all orders from db
   Order.find()
      .exec()
      .then(orders => {
         res.status(200).json({
            message: "Retrieved all orders sucessfully",
            orders
         });
      })
      .catch(err => {
         res.status(500).json({
            message: "An error occured",
            err
         });
      });
});

// @route   POST /orders
// @desc    Create new order
// @access  Private
router.post("/", (req, res) => {
   // get order details from request body
   const details = {
      product: req.body.productId,
      quantity: req.body.quantity
   };

   // create new order
   const order = new Order(details);

   // check if associated product exists
   Product.findById(details.product)
      .exec()
      .then(product => {
         if (!product) {
            res.status(404).json({
               message: "No product found"
            });
         } else {
            //save order to db
            return order.save();
         }
      })
      .then(order => {
         res.status(201).json({
            message: "Order created sucessfully",
            order
         });
      })
      .catch(err => {
         res.status(500).json({
            message: "An error occured",
            err
         });
      });
});

// @route   DELETE /orders
// @desc    delete order
// @access  Private
router.delete("/:orderId", (req, res) => {
   const id = req.param.orderId;

   Order.findByIdAndRemove(id)
      .exec()
      .then(order => {
         if (order) {
            res.status(200).json({
               message: "Order deleted sucessfully",
               order
            });
         } else {
            res.status(404).json({
               message: "No matches for order"
            });
         }
      })
      .catch(err => {
         res.status(200).json({
            message: "An error occured",
            err
         });
      });
});

module.exports = router;
