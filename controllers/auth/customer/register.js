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
    const existingUser = await Customer.findOne({ email, account_type: 0 });
    if (existingUser) {
      // user already exists in db
      return res.status(403).json({
        error: "Sorry, user with email already exists"
      });
    } else {
      await Customer.create(newUser);
      return res.status(201).json({
        success: "Account registered successfully."
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default signUp;
