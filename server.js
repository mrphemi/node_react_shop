const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 5000;

mongoose.connect(
   "mongodb://localhost:27017/shop",
   { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

// Initialize express
const app = express();

// json parser
const jsonParser = bodyParser.json();

// Enable cors
app.use(cors);

// Parse Json requests
app.use(jsonParser);

app.listen(PORT, () => {
   console.log(`Listening for requests on port ${PORT} `);
});
