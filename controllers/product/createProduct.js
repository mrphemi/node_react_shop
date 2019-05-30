import Product from "../../model/product";

const CreateProduct = (req, res) => {
    // Get product details from request body
    const details = {
        createdBy: req.body.userId,
        name: req.body.name,
        category: req.body.category,
        desc: req.body.desc,
        price: req.body.price,
        image: req.imageUrl,
        imageId: req.imageId
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
            res.status(500).json({
                errorMsg: "An error occured",
                err
            });
        });
};

export default CreateProduct;