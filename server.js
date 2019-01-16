const express = require("express");
const bodyParser = require("body-parser");

const PORT = 5000;

// Initialize express
const app = express();

// json parser
const jsonParser = bodyParser.json();

// Parse Json requests
app.use(jsonParser);

app.listen(PORT, () => {
   console.log(`Listening for requests on port ${PORT} `);
});
