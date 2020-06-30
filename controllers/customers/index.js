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
      .select("first_name last_name email phone")
      .limit(limit)
      .skip(offset);
    const meta = paginatedResults(page, docCount, customers);
    if (customers.length > 0) {
      res.status(200).json({
        success: true,
        message: "Customers retrieved successfully",
        meta,
        results: customers,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No customers found",
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
      return res.status(422).json({
        success: false,
        message: "Invalid customer id",
      });
    }
    const EXCLUDE_OPTIONS = "-__v -createdAt -updatedAt -password";
    const customer = await Customer.findById(customerId).select(
      EXCLUDE_OPTIONS,
    );
    if (customer) {
      res.status(200).json({
        success: true,
        message: "Customer retrieved successfully",
        result: customer,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No matches for customer",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};
