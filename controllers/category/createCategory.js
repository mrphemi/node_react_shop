import Category from "../../model/category";
import { handleError } from "../../helpers";

/**
 * Handles Category Creation
 *
 * @param {Object} req
 * @param {Object} res
 */

const createCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name });

  try {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      // category already exists in db
      return res.status(403).json({
        error: "Category already exists"
      });
    } else {
      const category = await Category.create(newCategory);
      return res.status(201).json({
        success: "Category Created Sucessfully"
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

export default createCategory;
