import Order from "../../model/order";

const deleteOrder = (req, res) => {
   const id = req.params.orderId;

   Order.findByIdAndDelete(id)
      .exec()
      .then(order => {
         if (order) {
            res.status(200).json({
               message: "Order deleted sucessfully",
               order
            });
         } else {
            res.status(404).json({
               message: "No matches for order"
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

export default deleteOrder;
