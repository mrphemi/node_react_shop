import _ from "lodash";
import Category from "../../model/category";
import Products from "../../model/product";
import { paginatedResults, getOffsetAndLimit } from "../../helpers/paginate";
import { handleError, isValidMongoId } from "../../helpers";

/**
 * Get all categories
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getAll = async (req, res) => {
  const { page } = req.query;
  try {
    const docCount = await Category.estimatedDocumentCount();
    const { limit, offset } = getOffsetAndLimit(page);
    const categories = await Category.find({})
      .select("name id")
      .limit(limit)
      .skip(offset);
    const meta = paginatedResults(page, docCount, categories);
    if (categories.length > 0) {
      res.status(200).json({
        success: "Categories retrieved successfully",
        meta,
        results: categories,
      });
    } else {
      res.json({
        success: "No Category found",
        results: categories,
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const loadCategory = async (req, res, next, id) => {
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(id)) {
      res.status(422).json({
        error: "Invalid category id",
      });
    }
    const EXCLUDE_OPTIONS = "-__v -createdAt -updatedAt";
    const category = await Category.findById(id).select(EXCLUDE_OPTIONS);
    if (!category) {
      return res.status(404).json({
        error: "No matches for category",
      });
    }
    req.category = category;
    next();
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Gets single Category
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getCategory = async (req, res) => {
  res.status(200).json({
    success: "Category retrieved successfully",
    result: req.category,
  });
};

/**
 * Handles Category Creation
 *
 * @param {Object} req
 * @param {Object} res
 */

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name });

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      // category already exists in db
      return res.status(403).json({
        error: "Category already exists",
      });
    } else {
      const category = await Category.create(newCategory);
      return res.status(201).json({
        success: "Category Created Successfully",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles category deletion
 *
 * @param {Object} req
 * @param {Object} res
 */

export const deleteCategory = async (req, res) => {
  try {
    const category = req.category;
    await Category.deleteOne({ _id: category._id });
    return res.status(200).json({
      success: "Category deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles category details update
 *
 * @param {Object} req
 * @param {Object} res
 */

export const updateCategory = async (req, res) => {
  try {
    const category = req.category;
    // update doc
    const updated = _.extend(category, req.body);
    // save updated doc
    await updated.save();
    res.status(201).json({
      success: "Category successfully updated",
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Gets products by category
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getProductsByCategory = async (req, res) => {
  const categoryId = req.category._id;
  const { page } = req.query;
  try {
    const docCount = await Products.countDocuments({ category: categoryId });
    const { limit, offset } = getOffsetAndLimit(page);
    const products = await Products.find({ category: categoryId })
      .select("name category price image")
      .limit(limit)
      .skip(offset);
    const meta = paginatedResults(page, docCount, products);
    if (products.length > 0) {
      res.status(200).json({
        success: "Products retrieved successfully",
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
