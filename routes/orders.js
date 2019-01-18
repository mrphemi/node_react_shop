const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../model/order");

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

   //save order to db
   order
      .save()
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

module.exports = router;
