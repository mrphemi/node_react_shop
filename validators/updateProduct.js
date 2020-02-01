import { updateProductSchema } from "../validation-schemas";
/**
 * Validates the update product request
 *
 * @param {Object} req
 *
 * @param {Object} res
 *
 * @param {Function} next
 *
 * @return {Object}
 */
export default async (req, res, next) => {
  try {
    await updateProductSchema.validate(req.body);
    return next();
  } catch (error) {
    return res.status(422).json({
      error: error.message
    });
  }
};
