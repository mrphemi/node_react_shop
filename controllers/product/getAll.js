import Product from "../../model/product";

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
    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

export default getAllProducts;
