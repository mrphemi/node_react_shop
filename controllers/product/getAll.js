import Product from "../../model/product";
import { handleError } from "../../helpers";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).select("name category price image");
    if (products.length > 0) {
      res.status(200).json({
        success: "Products retrieved",
        products
      });
    } else {
      res.json({
        success: "No products found",
        products
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default getAllProducts;
