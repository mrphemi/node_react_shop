import Product from "../../model/product";

const getProduct = (req, res) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .select("-__v")
        .exec()
        .then(product => {
            if (product) {
                res.status(200).json({
                    message: "Product retrieved sucessfully",
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
                errorMsg: "An error occured",
                err
            });
        });
};

export default getProduct;