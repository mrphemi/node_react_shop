const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
   res.status(200).json({
      message: "Handling get requests to /products"
   });
});

router.get("/:productId", (req, res) => {
   const id = req.params.productId;
   res.status(200).json({
      message: `Your reached a product with id:${id}`
   });
});

router.post("/", (req, res) => {
   res.status(200).json({
      message: "Handling post requests to /products"
   });
});

module.exports = router;
