import Order from "../../model/order";

const createOrder = (req, res) => {
  // create new order
  const item = {
    product: req.body.product,
    quantity: req.body.quantity,
  };
  const user = req.body.userID;
  const id = req.body.cartID;

  Order.findById(id)
    .exec()
    .then((cart) => {
      if (cart) {
        let products = cart.items.map((item) => item.product + "");
        if (products.includes(item.product)) {
          Order.findOneAndUpdate(
            {
              user: user,
              items: {
                $elemMatch: { product: item.product },
              },
            },
            {
              $inc: { "items.$.quantity": item.quantity },
            },
          )
            .exec()
            .then(() =>
              res.status(201).json({
                message: "Added to cart",
                cart,
              }),
            );
        } else {
          cart.items.push(item);
          cart.save().then(() =>
            res.status(201).json({
              message: "Added to cart",
              cart,
            }),
          );
        }
      } else {
        Order.create({
          user: user,
          items: [item],
        }).then((newCart) =>
          res.status(201).json({
            message: "Added to cart",
            newCart,
          }),
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorMsg: "An error occured",
        err,
      });
    });
};

export default createOrder;
