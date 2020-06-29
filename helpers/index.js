import mongoose from "mongoose";

/**
 * Check if id is a valid mongo db Object id
 *
 * @param {String} id
 *
 * @return {Boolean}
 */
export const isValidMongoId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * Check file type
 *
 * @param {Object} res
 * @param {Object} error
 *
 */

export const handleError = (res, error) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again",
    });
  }
  res.status(500).json({
    success: false,
    error: `${error.name}: ${error.message}`,
  });
};
