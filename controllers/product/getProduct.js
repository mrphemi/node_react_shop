/**
 * Fetches single product from db
 *
 * @param {Object} req
 * @param {Object} res
 */

const getProduct = async (req, res) => {
  res.status(200).json({
    success: "Product retrieved successfully",
    result: req.product,
  });
};

export default getProduct;
