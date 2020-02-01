import Product from "../../model/product";
import _ from "lodash";

const updateProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        error: "No matches for product"
      });
    }
    const updated = _.extend(product, req.body);
    const updatedProduct = await updated.save();
    res.status(201).json({
      success: "Product successfully updated",
      updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      message: `${error.name}: ${error.message}`
    });
  }
};

export default updateProduct;
