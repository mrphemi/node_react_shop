import Admin from "../../../model/admin";
import { handleError } from "../../../helpers";

/**
 * Handle admin login endpoint
 *
 * @param {Object} req
 * @param {Object} res
 */

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "email or password incorrect"
      });
    }

    // compare db password and user input password
    const passwordIsCorrect = user.comparePasswords(password);

    // Return error if password is incorrect
    if (!passwordIsCorrect) {
      return res.status(401).json({
        error: "email or password incorrect"
      });
    }

    const token = await user.generateToken();

    return res.status(200).json({
      success: "Login successful",
      token
    });
  } catch (error) {
    handleError(res, error);
  }
};

export default login;
