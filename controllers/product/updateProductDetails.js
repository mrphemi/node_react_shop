import _ from "lodash";

import Product from "../../model/product";
import { handleError } from "../../helpers";

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        error: "No matches for product"
      });
    }
    // update doc
    const updated = _.extend(product, req.body);
    // save updated doc
    const updatedProduct = await updated.save();
    res.status(201).json({
      success: "Product successfully updated",
      updatedProduct
    });
  } catch (error) {
    handleError(res, error);
  }
};

export default updateProduct;
