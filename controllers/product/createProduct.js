import Product from "../../model/product";

/**
 * Handles Product Creation
 *
 * @param {Object} req
 * @param {Object} res
 */

const CreateProduct = async (req, res) => {
  const { name, category, desc, price, image, imageId } = req.body;
  // Get product details from request body
  const details = {
    name,
    category,
    desc,
    price,
    image,
    imageId
  };

  // Create new product
  const newProduct = new Product(details);

  try {
    // Save new product to db
    const product = await Product.create(newProduct);
    return res.status(201).json({
      success: "Product Created Sucessfully"
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

export default CreateProduct;
