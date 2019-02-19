import Order from "../../model/order";

const getAllOrders = (req, res) => {
   // populate options
   const options = [{ path: "product", select: "id name desc price image" }];

   // Get all orders from db
   Order.find()
      .select("-__v")
      .populate(options)
      .exec()
      .then(orders => {
         res.status(200).json({
            message: "Retrieved all orders sucessfully",
            orders
         });
      })
      .catch(err => {
         res.status(500).json({
            errorMsg: "An error occured",
            err
         });
      });
};

export default getAllOrders;
