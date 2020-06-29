import _ from "lodash";

import Brand from "../../model/brand";
import { handleError, isValidMongoId } from "../../helpers";

/**
 * Gets all brands
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getAll = async (req, res) => {
  try {
    const brands = await Brand.find({}).select("name");
    if (brands.length > 0) {
      res.status(200).json({
        success: true,
        message: "Brands retrieved successfully",
        results: brands,
      });
    } else {
      res.json({
        success: true,
        message: "No Brand found",
        results: brands,
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const loadBrand = async (req, res, next, id) => {
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(id)) {
      return res.status(422).json({
        success: false,
        message: "Invalid brand id",
      });
    }
    const EXCLUDE_OPTIONS = "-__v -createdAt -updatedAt";
    const brand = await Brand.findById(id).select(EXCLUDE_OPTIONS);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "No matches for brand",
      });
    }
    req.brand = brand;
    next();
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Gets single brand
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getBrand = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Brand retrieved successfully",
    result: req.brand,
  });
};

/**
 * Handles brand Creation
 *
 * @param {Object} req
 * @param {Object} res
 */

export const createBrand = async (req, res) => {
  const { name } = req.body;
  const newBrand = new Brand({ name });
  try {
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(403).json({
        success: false,
        message: "Brand already exists",
      });
    } else {
      await Brand.create(newBrand);
      return res.status(201).json({
        success: true,
        message: "Brand Created Successfully",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles brand deletion
 *
 * @param {Object} req
 * @param {Object} res
 */

export const deleteBrand = async (req, res) => {
  try {
    const brand = req.brand;
    await Brand.deleteOne({ _id: brand._id });
    return res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles Brand details update
 *
 * @param {Object} req
 * @param {Object} res
 */

export const updateBrand = async (req, res) => {
  try {
    const brand = req.brand;
    // update doc
    const updated = _.extend(brand, req.body);
    // save updated doc
    await updated.save();
    res.status(200).json({
      success: true,
      message: "Brand successfully updated",
    });
  } catch (error) {
    handleError(res, error);
  }
};
