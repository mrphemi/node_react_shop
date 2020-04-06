import Customer from "../../model/customer";
import { getOffsetAndLimit, paginatedResults } from "../../helpers/paginate";
import { handleError } from "../../helpers";

/**
 * Fetches all customers from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getAllCustomers = async (req, res) => {
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
        results: customers
      });
    } else {
      res.json({
        success: "No customers found",
        results: customers
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getAllCustomers;
