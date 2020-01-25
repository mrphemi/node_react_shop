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

const port = config.port;
const app = express();

mongoose.promise = global.promise;
//connect to database
mongoose.connect(config.databaseUrl, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

// log requests
app.use(morgan("dev"));

//Enable cors
app.use(cors());

// Parse incoming json requests
app.use(express.json());

// Routes
app.use("/products", productRoute);
app.use("/category", categoryRoute);
app.use("/orders", orderRoute);
app.use("/register", signupRoute);
app.use("/login", loginRoute);

// Listen for incoming requests
app.listen(port, () => {
  console.log(`${Chalk.blue(`Project running on http://localhost:${port}`)}`);
});
