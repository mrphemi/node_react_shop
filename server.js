import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import productRoute from "./routes/products";
import orderRoute from "./routes/orders";
import signupRoute from "./routes/auth/signUp";
import loginRoute from "./routes/auth/login";
import authRoute from "./routes/auth/auth";

mongoose.promise = global.promise;

const port = 5000;
const app = express();

//  Connection strings
const prodDB = `mongodb+srv://Test:${
  process.env.DB_PROD_PW
}@cluster0-c2jr4.mongodb.net/test?retryWrites=true`;
const localDB = "mongodb://localhost:27017/shop";
const connection = process.env.NODE_ENV === "production" ? prodDB : localDB;

//connect to database
mongoose.connect(connection, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
    console.log("Connected to database");
});

//Enable cors
app.use(cors());

// Parse incoming json requests
app.use(express.json());

// Routes
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/auth", authRoute);

// Listen for incoming requests
app.listen(port, () => {
    console.log(`Listening for requests on port ${port}`);
});