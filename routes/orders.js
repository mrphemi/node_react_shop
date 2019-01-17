const express = require("express");
const router = express.Router();

// @route   GET /orders
// @desc    Retrieve all orders
// @access  Private

router.get("/", (req, res) => {
   res.status(200).json({
      message: "Handling requests for /orders"
   });
});

module.exports = router;
