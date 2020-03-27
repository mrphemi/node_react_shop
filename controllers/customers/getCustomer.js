import User from "../../model/user";

import { isValidMongoId, handleError } from "../../helpers";

/**
 * Fetches single customer from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(customerId)) {
      res.status(422).json({
        error: "Invalid customer id"
      });
    }

    const customer = await User.findOne({
      _id: customerId,
      account_type: 0
    }).select("first_name last_name email");

    if (customer) {
      res.status(200).json({
        success: "Customer retrieved successfully",
        customer
      });
    } else {
      res.status(404).json({
        error: "No matches for customer"
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getCustomer;
