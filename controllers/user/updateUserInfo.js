import _ from "lodash";

import User from "../../model/user";
import { handleError } from "../../helpers";

/**
 * Handles user info. update
 *
 * @param {Object} req
 * @param {Object} res
 */

const updateUserInfo = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "No matches for user"
      });
    }
    // update doc
    const updated = _.extend(user, req.body);
    // save updated doc
    const updatedUser = await updated.save();
    res.status(201).json({
      success: "User successfully updated"
    });
  } catch (error) {
    handleError(res, error);
  }
};

export default updateUserInfo;
