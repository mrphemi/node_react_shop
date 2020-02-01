import Category from "../../model/category";

const getAllProducts = async (req, res) => {
  try {
    const categories = await Category.find({}).select("name id");
    if (categories.length > 0) {
      res.status(200).json({
        success: "Categories retrieved",
        categories
      });
    } else {
      res.json({
        success: "No Category found",
        categories
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

export default getAllProducts;
