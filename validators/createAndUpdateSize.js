import { SizeSchema } from "../validation-schemas";
/**
 * Validates the create category request
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
  const { size } = req.body;
  try {
    await SizeSchema.validate(
      {
        size,
      },
      { strict: true },
    );
    return next();
  } catch (error) {
    return res.status(422).json({
      error: error.message,
    });
  }
};
