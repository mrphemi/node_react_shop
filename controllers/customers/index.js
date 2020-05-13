import Customer from "../../model/customer";
import { getOffsetAndLimit, paginatedResults } from "../../helpers/paginate";
import { isValidMongoId, handleError } from "../../helpers";

/**
 * Gets all customers
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getAll = async (req, res) => {
  const { page } = req.query;
  try {
    const docCount = await Customer.estimatedDocumentCount();
    const { limit, offset } = getOffsetAndLimit(page);
    const customers = await Customer.find({})
      .select("first_name last_name email")
      .limit(limit)
      .skip(offset);
    const meta = paginatedResults(page, docCount, customers);
    if (customers.length > 0) {
      res.status(200).json({
        success: "Customers retrieved successfully",
        meta,
        results: customers,
      });
    } else {
      res.json({
        success: "No customers found",
        results: customers,
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Gets single customer
 *
 * @param {Object} req
 * @param {Object} res
 */

export const getCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    if (!isValidMongoId(customerId)) {
      res.status(422).json({
        error: "Invalid customer id",
      });
    }

    const customer = await Customer.findById(customerId).select(
      "first_name last_name email",
    );

    if (customer) {
      res.status(200).json({
        success: "Customer retrieved successfully",
        result: customer,
      });
    } else {
      res.status(404).json({
        error: "No matches for customer",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};
