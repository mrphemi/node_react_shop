import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import Chalk from "chalk";

import config from "./config";

import productRoute from "./routes/products";
import categoryRoute from "./routes/category";
import brandRoute from "./routes/brands";
import sizeRoute from "./routes/size";
import orderRoute from "./routes/orders";
import customerRegisterRoute from "./routes/auth/customer/register";
import customerLoginRoute from "./routes/auth/customer/login";
import adminRegisterRoute from "./routes/auth/admin/register";
import adminLoginRoute from "./routes/auth/admin/login";
import customerRoute from "./routes/customers";
import userRoute from "./routes/users";

const port = config.port;
const app = express();

mongoose.Promise = global.Promise;
//connect to database
mongoose.connect(config.databaseUrl, { useNewUrlParser: true }).catch((err) => {
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
app.use("/register", customerRegisterRoute);
app.use("/login", customerLoginRoute);
app.use("/admin/register", adminRegisterRoute);
app.use("/admin/login", adminLoginRoute);
app.use("/users", userRoute);
app.use("/customers", customerRoute);
app.use("/brands", brandRoute);
app.use("/sizes", sizeRoute);

app.get("/", function (req, res) {
  res.send("Welcome to reactshop api");
});

// Listen for incoming requests
app.listen(port, () => {
  console.log(`${Chalk.blue(`Project running on http://localhost:${port}`)}`);
});
