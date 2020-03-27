import User from "../../model/user";

import { handleError } from "../../helpers";

/**
 * Fetches all customers from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getAll = async (req, res) => {
  try {
    const customers = await User.find({ account_type: 0 }).select(
      "first_name last_name email"
    );

    if (customers.length > 0) {
      res.status(200).json({
        success: "Customers retrieved successfully",
        customers
      });
    } else {
      res.json({
        success: "No customers found",
        customers
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getAll;
