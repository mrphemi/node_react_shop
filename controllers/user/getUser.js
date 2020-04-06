import Customer from "../../model/customer";
import { isValidMongoId, handleError } from "../../helpers";

/**
 * Fetches single user from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(userId)) {
      res.status(422).json({
        error: "Invalid user id"
      });
    }

    const exclude = "-password -__v -account_type -createdAt -updatedAt -role";

    const user = await Customer.findById(userId).select(exclude);

    if (user) {
      res.status(200).json({
        success: "User retrieved successfully",
        result: user
      });
    } else {
      res.status(404).json({
        error: "No matches for user"
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getUser;
