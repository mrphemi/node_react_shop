import Order from "../../model/order";
import Product from "../../model/product";

const createOrder = (req, res) => {
   // get order details from request body
   const details = {
      user: req.body.userId,
      product: req.body.productId,
      quantity: req.body.quantity
   };

   // create new order
   const order = new Order(details);

   // check if associated product exists
   Product.findById(details.product)
      .exec()
      .then(product => {
         if (!product) {
            res.status(404).json({
               message: "No product found"
            });
         } else {
            //save order to db
            return order.save();
         }
      })
      .then(order => {
         res.status(201).json({
            message: "Order created sucessfully",
            order
         });
      })
      .catch(err => {
         res.status(500).json({
            errorMsg: "An error occured",
            err
         });
      });
};

export default createOrder;
