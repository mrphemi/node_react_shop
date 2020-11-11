import express from "express";
import multer from "multer";

const router = express.Router();

import cloudinaryConfig from "../config/cloudinary";
import {
  getAll,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getRelatedProducts,
  getProductsBySearch,
  getProductsByFilters,
  loadProduct,
  uploadProductImage,
} from "../controllers/product";
import { requireSignIn, requireAdmin } from "../middlewares/auth";
import checkFileType from "../helpers/fileFilter";
import { createProductValidator, updateProductValidator } from "../validators";

// Multer storage engine
const storage = multer.memoryStorage();

// Multer image upload
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("product_img");

router.use("/", cloudinaryConfig);

// @route   GET /products
// @desc    Retrieve all products
// @access  Public
router.get("/", getAll);

// @route   GET /products/search
// @desc    Retrieve all products based on search string
// @access  Public
router.get("/search", getProductsBySearch);

// @route   GET /products/filters
// @desc    Retrieve all products based on filters
// @access  Public
router.get("/filters", getProductsByFilters);

// @route   GET /products/{productId}
// @desc    Retrieve's single product
// @access  Public
router.get("/:productId", getProduct);

// @route   GET /products/{productId}
// @desc    Retrieve's single product
// @access  Public
router.get("/:productId/related", getRelatedProducts);

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
  uploadProductImage,
  createProduct,
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
  uploadProductImage,
  updateProduct,
);

router.param("productId", loadProduct);

export default router;
