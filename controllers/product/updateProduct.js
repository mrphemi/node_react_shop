import Product from "../../model/product";

const updateProduct = (req, res) => {
   const productId = req.params.productId;
   Product.findByIdAndUpdate(productId, req.body, { new: true })
      .exec()
      .then(product => {
         if (product) {
            res.status(200).json({
               message: "Product updated sucessfully",
               product
            });
         } else {
            res.status(404).json({
               message: "No matches for product"
            });
         }
      })
      .catch(err => {
         res.status(500).json({
            message: "An error occured",
            err
         });
      });
};

export default updateProduct;
