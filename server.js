import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import Chalk from "chalk";

import config from "./config";

import productRoute from "./routes/products";
import categoryRoute from "./routes/category";
import orderRoute from "./routes/orders";
import signupRoute from "./routes/auth/signUp";
import loginRoute from "./routes/auth/login";
import userRoute from "./routes/users";

const port = config.port;
const app = express();

mongoose.Promise = global.Promise;
//connect to database
mongoose.connect(config.databaseUrl, { useNewUrlParser: true }).catch(err => {
  console.log(err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

// log requests
app.use(morgan("dev"));

//Enable cors
app.use(cors());

// Parse incoming json requests
app.use(express.json());
// for encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/products", productRoute);
app.use("/categories", categoryRoute);
app.use("/orders", orderRoute);
app.use("/register", signupRoute);
app.use("/login", loginRoute);
app.use("/users", userRoute);

app.get("/", function(req, res) {
  res.send("Welcome to reactshop api");
});

// Listen for incoming requests
app.listen(port, () => {
  console.log(`${Chalk.blue(`Project running on http://localhost:${port}`)}`);
});
