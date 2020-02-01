import Chalk from "chalk";

import Product from "../../model/product";
import { isValidMongoId } from "../../helpers";

const getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    // check if id is a valid mongo id
    if (!isValidMongoId(productId)) {
      console.log(Chalk.red("Invalid product id"));
    }

    const product = await Product.findById(productId).select(
      "name category price image desc quantity"
    );

    if (product) {
      res.status(200).json({
        success: "Product retrieved sucessfully",
        product
      });
    } else {
      res.status(404).json({
        success: "No matches for product"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

export default getProduct;
