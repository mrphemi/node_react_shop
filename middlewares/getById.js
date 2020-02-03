import User from "../model/user";
import { handleError } from "../helpers";

/**
 * Finds user by id from db(id from route param)
 * Sets the user on request
 *
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 *
 * @return {Function}
 */

export const getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: "No matches for user"
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    handleError(res, error);
  }
};
