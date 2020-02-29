import User from "../../model/user";
import { handleError } from "../../helpers";

/**
 * Fetches all users from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("first_name last_name email");
    if (users.length > 0) {
      res.status(200).json({
        success: "Users retrieved successfully",
        users
      });
    } else {
      res.json({
        success: "No user found",
        users
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getAllUsers;
