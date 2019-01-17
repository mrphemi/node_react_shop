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
         if (products) {
            res.status(200).json({
               message: "Products retrieved",
               products
            });
         } else {
            res.status(404).json({
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

router.get("/:productId", (req, res) => {
   const id = req.params.productId;
   res.status(200).json({
      message: `Your reached a product with id:${id}`
   });
});

// @route   POST /products
// @desc    Creates new products
// @access  Private
router.post("/", (req, res) => {
   // Get product details from request body
   const details = {
      name: req.body.name,
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
         res.status(200).json({
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

module.exports = router;
