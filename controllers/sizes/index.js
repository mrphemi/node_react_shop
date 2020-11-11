import _ from "lodash";

import Size from "../../model/size";
import { handleError } from "../../helpers";

/**
 * Gets all sizes
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getAll = async (req, res) => {
  try {
    const sizes = await Size.find({}).select("size");
    if (sizes.length > 0) {
      res.status(200).json({
        success: true,
        message: "Sizes retrieved successfully",
        results: sizes,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No Size found",
        results: sizes,
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const loadSize = async (req, res, next, id) => {
  try {
    const EXCLUDE_OPTIONS = "-__v -createdAt -updatedAt";
    const size = await Size.findById(id).select(EXCLUDE_OPTIONS);
    if (!size) {
      return res.status(404).json({
        success: false,
        message: "No matches for size",
      });
    }
    req.size = size;
    next();
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Gets single size
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getSize = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Size retrieved successfully",
    result: req.size,
  });
};

/**
 * Handles size creation
 *
 * @param {Object} req
 * @param {Object} res
 */

export const createSize = async (req, res) => {
  const { size } = req.body;
  const newSize = new Size({ size });
  try {
    const existingSize = await Size.findOne({ size });
    if (existingSize) {
      return res.status(403).json({
        success: false,
        message: "Size already exists",
      });
    }
    await Size.create(newSize);
    res.status(201).json({
      success: true,
      message: "Size Created Successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles size deletion
 *
 * @param {Object} req
 * @param {Object} res
 */

export const deleteSize = async (req, res) => {
  try {
    const size = req.size;
    await Size.deleteOne({ _id: size._id });
    return res.status(200).json({
      success: false,
      message: "Size deleted successfully",
    });
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles size update
 *
 * @param {Object} req
 * @param {Object} res
 */

export const updateSize = async (req, res) => {
  try {
    const size = req.size;
    // update doc
    const updated = _.extend(size, req.body);
    // save updated doc
    await updated.save();
    res.status(201).json({
      success: true,
      message: "Size successfully updated",
    });
  } catch (error) {
    handleError(res, error);
  }
};
