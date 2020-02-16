import Chalk from "chalk";

import User from "../../model/user";
import { isValidMongoId, handleError } from "../../helpers";

/**
 * Fetches single user from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(userId)) {
      console.log(Chalk.red("Invalid user id"));
    }

    const user = await User.findById(userId).select(
      "first_name last_name user_name email"
    );

    if (user) {
      res.status(200).json({
        success: "User retrieved successfully",
        user
      });
    } else {
      res.status(404).json({
        error: "No matches for user"
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getUser;
