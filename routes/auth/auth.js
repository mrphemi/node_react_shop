const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Get token from incoming requests
const verifyToken = (req, res, next) => {
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

router.post("/", verifyToken, (req, res) => {
   // verify user
   jwt.verify(req.token, "secret", (err, user) => {
      if (err) {
         res.status(401).json({
            errMsg: "Please login to view your profile"
         });
      } else {
         res.send({ user });
      }
   });
});

module.exports = router;
