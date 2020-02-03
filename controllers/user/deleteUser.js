import User from "../../model/user";
import { handleError } from "../../helpers";

/**
 * Handles user deletion
 *
 * @param {Object} req
 * @param {Object} res
 */

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      res.status(200).json({
        success: "User deleted sucessfully"
      });
    } else {
      // User not found
      res.status(404).json({
        error: "No matches for this user"
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default deleteUser;
