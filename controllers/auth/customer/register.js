import Customer from "../../../model/customer";
import { handleError } from "../../../helpers";

/**
 * Handle customer registration endpoint
 *
 * @param {Object} req
 * @param {Object} res
 *
 */

const signUp = async (req, res) => {
  // create new customer account
  const newUser = new Customer(req.body);
  try {
    const { email } = req.body;
    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      // user already exists in db
      return res.status(403).json({
        success: false,
        message: "Sorry, user with email already exists",
      });
    } else {
      await Customer.create(newUser);
      return res.status(201).json({
        success: true,
        message: "Account registered successfully.",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default signUp;
