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
    const users = await User.find({}).select("id email account_type");
    if (users.length > 0) {
      res.status(200).json({
        success: "Users retrieved",
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
