import Admin from "../../../model/admin";
import { handleError } from "../../../helpers";

/**
 * Handle admin registration endpoint
 *
 * @param {Object} req
 * @param {Object} res
 *
 */

const register = async (req, res) => {
  // create new admin account
  const newUser = new Admin({ ...req.body });

  try {
    const { email } = req.body;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(403).json({
        success: false,
        message: "Sorry, user with email already exists",
      });
    }
    await Admin.create(newUser);
    return res.status(201).json({
      success: true,
      message: "Account registered successfully.",
    });
  } catch (error) {
    handleError(res, error);
  }
};

export default register;
