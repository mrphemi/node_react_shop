import Order from "../../model/order";

function sum(orders) {
    let prices = orders[0].items.map(item => item.product.price * item.quantity);
    let total = prices.reduce((total, price) => total + price, 0);
    return total;
}

const getAllOrders = (req, res) => {
    // populate options
    const options = [{ path: "items.product", select: "id name desc price image" }];

    // Get all orders from db
    Order.find()
        .select("-__v")
        .populate(options)
        .exec()
        .then(orders => {
            if (orders) {
                res.status(200).json({
                    orders,
                    total: sum(orders)
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

export default getAllOrders;