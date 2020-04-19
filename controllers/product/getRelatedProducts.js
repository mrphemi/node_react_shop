import Product from "../../model/product";
import { handleError } from "../../helpers";

const getRelatedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    }).select("name category price image");
    if (products.length > 0) {
      res.status(200).json({
        success: "Products retrieved",
        results: products,
      });
    } else {
      res.json({
        success: "No products found",
        results: products,
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getRelatedProducts;
