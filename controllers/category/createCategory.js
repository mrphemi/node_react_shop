import Category from "../../model/category";

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
      const { id, name } = category;
      return res.status(201).json({
        success: "Category Created Sucessfully",
        data: {
          id,
          name
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

export default createCategory;
