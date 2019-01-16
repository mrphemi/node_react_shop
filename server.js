const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoute = require("./routes/products");

mongoose.promise = global.promise;

const port = 5000;
const app = express();

//connect to database
mongoose.connect(
   "mongodb://localhost:27017/shop",
   { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
   console.log("Connected to database");
});

//Enable cors
app.use(cors());

// Parse incoming json requests
app.use(express.json());

// Routes
app.use("/products", productRoute);

// Listen for incoming requests
app.listen(port, () => {
   console.log(`Listening for requests on port ${port}`);
});
