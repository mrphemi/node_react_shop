import Product from "../../model/product";

const CreateProduct = (req, res) => {
   // Get product details from request body
   const details = {
      user: req.body.userId,
      name: req.body.name,
      category: req.body.category,
      desc: req.body.desc,
      price: req.body.price,
      image: req.body.imageUrl
   };

   // Create new product
   const newProduct = new Product(details);

   // Save new product to db
   newProduct
      .save()
      .then(product => {
         res.status(201).json({
            message: "Product created sucessfully",
            product
         });
      })
      .catch(err => {
         res.status(401).json({
            errMessage: err.message
         });
      });
};

export default CreateProduct;
