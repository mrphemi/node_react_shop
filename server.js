const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/products");

const PORT = 8000;

// connect to db
mongoose.connect(
   "mongodb://localhost:27017/shop",
   { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

// Initialize express
const app = express();

// Enable cors
app.use(cors);

// json parser
const jsonParser = bodyParser.json();

// Parse Json requests
app.use(jsonParser);

//Routes
app.use("/products", productRoutes);

app.listen(PORT, () => {
   console.log(`Listening for requests on port ${PORT} `);
});
