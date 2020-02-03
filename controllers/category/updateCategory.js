import _ from "lodash";

import Category from "../../model/category";
import { handleError } from "../../helpers";

/**
 * Updates specified category
 *
 * @param {Object} req
 * @param {Object} res
 */

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        error: "No matches for category"
      });
    }
    // update doc
    const updated = _.extend(category, req.body);
    // save updated doc
    const updatedCategory = await updated.save();
    res.status(201).json({
      success: "Category successfully updated",
      updatedCategory
    });
  } catch (error) {
    handleError(res, error);
  }
};

export default updateCategory;
