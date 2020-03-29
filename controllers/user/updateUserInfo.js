import _ from "lodash";

import Customer from "../../model/customer";
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
    const user = await Customer.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "No matches for user"
      });
    }
    // update doc
    const updated = _.merge(user, req.body);

    // save updated doc
    await updated.save();
    res.status(201).json({
      success: "User successfully updated"
    });
  } catch (error) {
    handleError(res, error);
  }
};

export default updateUserInfo;
