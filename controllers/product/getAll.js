import Product from "../../model/product";

const getAllProducts = (req, res) => {
   Product.find({})
      .select("name category price image")
      .exec()
      .then(products => {
         if (products.length > 0) {
            res.status(200).json({
               message: "Products retrieved",
               products
            });
         } else {
            res.json({
               message: "No products found"
            });
         }
      })
      .catch(err => {
         res.status(500).json({
            errorMsg: "An error occured",
            err
         });
      });
};

export default getAllProducts;
