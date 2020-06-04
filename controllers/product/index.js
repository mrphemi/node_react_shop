import path from "path";
import Datauri from "datauri";
import cloudinary from "cloudinary";
import Chalk from "chalk";
import _ from "lodash";
import Product from "../../model/product";
import { isValidMongoId, handleError } from "../../helpers";
import { getOffsetAndLimit, paginatedResults } from "../../helpers/paginate";

// cloudinary uploader
const uploader = cloudinary.v2.uploader;

export const loadProduct = async (req, res, next, id) => {
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(id)) {
      res.status(422).json({
        error: "Invalid product id",
      });
    }
    const EXCLUDE_OPTIONS = "-__v -createdAt -updatedAt";
    const product = await Product.findById(id).select(EXCLUDE_OPTIONS);
    if (!product) {
      return res.status(404).json({
        error: "No matches for product",
      });
    }
    req.product = product;
    next();
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Gets all products
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getAll = async (req, res) => {
  const { page } = req.query;
  try {
    const docCount = await Product.estimatedDocumentCount();
    const { limit, offset } = getOffsetAndLimit(page);
    const products = await Product.find({})
      .select("name category price image")
      .limit(limit)
      .skip(offset);
    const meta = paginatedResults(page, docCount, products);
    if (products.length > 0) {
      res.status(200).json({
        success: "Products retrieved",
        meta,
        results: products,
      });
    } else {
      res.json({
        success: "No products found",
        results: products,
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Gets related products
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getRelatedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    }).select("name category price image");
    if (products.length > 0) {
      res.status(200).json({
        success: "Products retrieved",
        results: products,
      });
    } else {
      res.json({
        success: "No products found",
        results: products,
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Fetches all products based on search string
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getProductsBySearch = async (req, res) => {
  const { search, page } = req.query;
  try {
    const docCount = await Product.countDocuments({
      name: { $regex: search, $options: "i" },
    });
    const { limit, offset } = getOffsetAndLimit(page);
    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    })
      .select("name category price image")
      .limit(limit)
      .skip(offset);
    const meta = paginatedResults(page, docCount, products);
    if (products.length > 0) {
      res.status(200).json({
        success: "Products retrieved",
        meta,
        results: products,
      });
    } else {
      res.json({
        success: "No products found",
        results: products,
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Fetches single product from db
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getProduct = async (req, res) => {
  res.status(200).json({
    success: "Product retrieved successfully",
    result: req.product,
  });
};

/**
 * Handles product creation
 *
 * @param {Object} req
 * @param {Object} res
 */

export const createProduct = async (req, res) => {
  console.log(req.body);
  // Create new product
  const newProduct = new Product({
    ...req.body,
    availableSizes: JSON.parse(req.body.availableSizes),
  });
  try {
    // Save new product to db
    const product = await Product.create(newProduct);
    return res.status(201).json({
      success: "Product Created Successfully",
      id: product.id,
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles product deletion
 *
 * @param {Object} req
 * @param {Object} res
 */

export const deleteProduct = async (req, res) => {
  try {
    const product = req.product;
    await Product.deleteOne({ _id: product._id });

    //  Delete product image from cloudinary
    uploader.destroy(product.image_id, function (result) {
      console.log(Chalk.red("Image deleted"));
    });

    return res.status(200).json({
      success: "Product deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles Product update
 *
 * @param {Object} req
 * @param {Object} res
 */

export const updateProduct = async (req, res) => {
  try {
    const product = req.product;
    // delete current product image from cloudinary
    // if user updates product image
    if (req.file) {
      // Grab current image id
      const { image_id } = product;
      // Delete current product image from cloudinary
      uploader.destroy(image_id, function (result) {
        console.log(Chalk.red("Product image deleted"));
      });
    }

    // update doc
    const updated = _.extend(product, req.body);
    // save updated doc
    const updatedProduct = await updated.save();
    res.status(201).json({
      success: "Product successfully updated",
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Converts incoming req file(image file) to dataUri and
 * uploads image to cloudinary
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Function}
 */

const cloudinaryFolder =
  process.env.NODE_ENV === "production"
    ? "ecommerce_prod/products"
    : "ecommerce/products";

// data uri instance
const dUri = new Datauri();

export const uploadProductImage = (req, res, next) => {
  // check if file is part of request data
  if (req.file) {
    // convert file buffer to data uri
    const img = dUri.format(
      path.extname(req.file.originalname),
      req.file.buffer,
    ).content;
    // upload image to cloudinary
    const public_id = `${Date.now()}_${req.file.fieldname}`;
    uploader
      .upload(img, {
        folder: cloudinaryFolder,
        public_id,
      })
      .then((result) => {
        req.body.image = result.secure_url;
        req.body.image_id = result.public_id;
        return next();
      })
      .catch((err) => {
        handleError(res, err);
      });
  } else {
    if (req.method === "POST") {
      res.status(422).json({
        error: "No files selected",
      });
    } else {
      return next();
    }
  }
};
