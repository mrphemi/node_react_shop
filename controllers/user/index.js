import _ from "lodash";
import Customer from "../../model/customer";
import Admin from "../../model/admin";
import { isValidMongoId, handleError } from "../../helpers";

/**
 * Gets single user
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(userId)) {
      return res.status(422).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const EXCLUDE_OPTIONS = "-password -__v -createdAt -updatedAt -role";
    let user;

    if (req.authUser.role === "Customer") {
      user = await Customer.findById(userId).select(EXCLUDE_OPTIONS);
    } else {
      user = await Admin.findById(userId).select(EXCLUDE_OPTIONS);
    }

    if (user) {
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        result: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No matches for user",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles user deletion
 *
 * @param {Object} req
 * @param {Object} res
 */

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Customer.findByIdAndDelete(userId);
    if (user) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      // User not found
      res.status(404).json({
        success: false,
        message: "No matches for this user",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Handles user info. update
 *
 * @param {Object} req
 * @param {Object} res
 */

export const updateUserInfo = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Customer.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No matches for user",
      });
    }
    // update doc
    const updated = _.merge(user, req.body);
    // save updated doc
    await updated.save();
    res.status(201).json({
      success: true,
      message: "User successfully updated",
    });
  } catch (error) {
    handleError(res, error);
  }
};
