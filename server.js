import "dotenv/config";

import express from "express";

import setupMiddleWare from "./setup/middleware";
import setupDatabase from "./setup/database";
import setupRoutes from "./setup/routes";

const app = express();

setupDatabase(app);
setupMiddleWare(app);
setupRoutes(app);

app.get("/", function (req, res) {
  res.send("Welcome to e-commerce api");
});
