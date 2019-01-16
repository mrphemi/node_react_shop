const express = require("express");
const router = express.Router();

const Product = require("../model/product");

router.get("/", (req, res) => {
   res.status(200).json({
      message: "Handling get requests to /products"
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
