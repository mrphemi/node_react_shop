const express = require("express");
const router = express.Router();

const Product = require("../model/product");

// @route   GET /products
// @desc    Retrieve all products
// @access  Public
router.get("/", (req, res) => {
   Product.find({})
      .exec()
      .then(products => {
         if (products.length > 0) {
            res.status(200).json({
               message: "Products retrieved",
               products
            });
         } else {
            res.json({
               message: "No products found"
            });
         }
      })
      .catch(err => {
         res.status(500).json({
            message: "An error occured",
            err
         });
      });
});

// @route   GET /products/{productId}
// @desc    Retrieve's single product
// @access  Public
router.get("/:productId", (req, res) => {
   const productId = req.params.productId;
   Product.findById(productId)
      .exec()
      .then(product => {
         if (product) {
            res.status(200).json({
               message: "Product retrieved sucessfully",
               product
            });
         } else {
            res.status(404).json({
               message: "No matches for product"
            });
         }
      })
      .catch(err => {
         res.status(500).json({
            message: "An error occured",
            err
         });
      });
});

// @route   POST /products
// @desc    Creates new product
// @access  Private
router.post("/", (req, res) => {
   // Get product details from request body
   const details = {
      name: req.body.name,
      category: req.body.category,
      desc: req.body.desc,
      price: req.body.price,
      image: req.body.image
   };

   // Create new product
   const newProduct = new Product(details);

   // Save new product to db
   newProduct
      .save()
      .then(product => {
         res.status(201).json({
            message: "Product created sucessfully",
            product
         });
      })
      .catch(err => {
         res.status(401).json({
            errMessage: err.message
         });
      });
});

// @route   DELETE /products
// @desc    Deletes specified product
// @access  Private
router.delete("/:productId", (req, res) => {
   const productId = req.params.productId;
   Product.findByIdAndDelete(productId)
      .exec()
      .then(product => {
         if (product) {
            res.status(200).json({
               message: "Product deleted sucessfully",
               product
            });
         } else {
            res.status(404).json({
               message: "No matches for product"
            });
         }
      })
      .catch(err => {
         res.status(500).json({
            message: "An error occured",
            err
         });
      });
});

// @route   PATCH /products
// @desc    Updates specified product
// @access  Private
router.patch("/:productId", (req, res) => {
   const productId = req.params.productId;
   Product.findByIdAndUpdate(productId, req.body, { new: true })
      .exec()
      .then(product => {
         if (product) {
            res.status(200).json({
               message: "Product updated sucessfully",
               product
            });
         } else {
            res.status(404).json({
               message: "No matches for product"
            });
         }
      })
      .catch(err => {
         res.status(500).json({
            message: "An error occured",
            err
         });
      });
});

module.exports = router;
