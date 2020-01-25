import { ProductSchema } from "../validation-schemas";
/**
 * Validates the create product request
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
  const { name, desc, category, price } = req.body;
  try {
    await ProductSchema.validate({
      name,
      desc,
      category,
      price
    });
    return next();
  } catch (error) {
    return res.status(422).json({
      error: error.message
    });
  }
};
