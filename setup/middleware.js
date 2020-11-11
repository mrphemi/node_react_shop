import express from "express";
import cors from "cors";
import morgan from "morgan";

export default function setupMiddleWare(app) {
  // log requests
  app.use(morgan("dev"));

  //Enable cors
  app.use(cors());

  // Parse incoming json requests
  app.use(express.json());

  // for encoded bodies
  app.use(express.urlencoded({ extended: true }));
}
