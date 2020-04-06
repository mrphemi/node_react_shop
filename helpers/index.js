import mongoose from "mongoose";

/**
 * Check if id is a valid mongo db Object id
 *
 * @param {String} id
 *
 */
export const isValidMongoId = id => mongoose.Types.ObjectId.isValid(id);

/**
 * Check file type
 *
 * @param {Object} res
 * @param {Object} error
 *
 */

export const handleError = (res, error) => {
  res.status(500).json({
    error: "Something went wrong",
    message: `${error.name}: ${error.message}`
  });
};
