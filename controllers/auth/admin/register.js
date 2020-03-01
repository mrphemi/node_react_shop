import User from "../../../model/user";
import { handleError } from "../../../helpers";

/**
 * Handle admin registration endpoint
 *
 * @param {Object} req
 * @param {Object} res
 *
 */

const signUp = async (req, res) => {
  // create new admin account
  const newUser = new User({ ...req.body, account_type: 1 });

  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email, account_type: 1 });
    if (existingUser) {
      // user already exists in db
      return res.status(403).json({
        error: "User already exists"
      });
    } else {
      const user = await User.create(newUser);
      return res.status(201).json({
        success: "Account registered successfully."
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default signUp;
