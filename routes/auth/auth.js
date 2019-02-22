import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Get token from incoming requests
const getToken = (req, res, next) => {
   const authHeader = req.headers["authorization"];
   if (authHeader) {
      // Format : Bearer <token>. Grab only the token
      const token = authHeader.split(" ")[1];
      req.token = token;
      next();
   } else {
      res.sendStatus(403);
   }
};

router.post("/", getToken, (req, res) => {
   // verify user
   jwt.verify(req.token, "secret", (err, user) => {
      if (err) {
         res.status(401).json({
            errorMsg: "Please login to continue"
         });
      } else {
         res.send({ user });
      }
   });
});

export default router;
