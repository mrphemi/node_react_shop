import express from "express";
const router = express.Router();

import cloudinaryConfig from "../config/cloudinary";
import {
   getAllProducts,
   getProduct,
   createProduct,
   deleteProduct,
   updateProduct,
   uploadImage
} from "../controllers/product";

router.use("/", cloudinaryConfig);

// @route   GET /products
// @desc    Retrieve all products
// @access  Public
router.get("/", getAllProducts);

// @route   GET /products/{productId}
// @desc    Retrieve's single product
// @access  Public
router.get("/:productId", getProduct);

// @route   POST /products
// @desc    Creates new product
// @access  Private
router.post("/", createProduct);

// @route   POST /products/image-upload
// @desc    upload product image
// @access  Private
router.post("/image-upload", uploadImage);

// @route   DELETE /products
// @desc    Deletes specified product
// @access  Private
router.delete("/:productId", deleteProduct);

// @route   PATCH /products
// @desc    Updates specified product
// @access  Private
router.patch("/:productId", updateProduct);

export default router;
