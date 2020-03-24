import express from "express";
import multer from "multer";

const router = express.Router();

import cloudinaryConfig from "../config/cloudinary";
import {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProductDetails
} from "../controllers/product";
import { requireSignIn, requireAdmin } from "../middlewares/auth";
import uploadImage from "../middlewares/uploadImage";
import checkFileType from "../helpers/fileFilter";
import { createProductValidator, updateProductValidator } from "../validators";

// Multer storage engine
const storage = multer.memoryStorage();

// Multer image upload
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("product_img");

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
// @admin_resource    True
router.post(
  "/",
  upload,
  requireSignIn,
  requireAdmin,
  createProductValidator,
  uploadImage,
  createProduct
);

// @route   DELETE /products/{productId}
// @desc    Deletes specified product
// @access  Private
// @admin_resource    True
router.delete("/:productId", requireSignIn, requireAdmin, deleteProduct);

// @route   PUT /products/{productId}
// @desc    Updates specified product details
// @access  Private
// @admin_resource   True
router.put(
  "/:productId",
  upload,
  requireSignIn,
  requireAdmin,
  updateProductValidator,
  uploadImage,
  updateProductDetails
);

export default router;
