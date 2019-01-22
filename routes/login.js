const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../model/user");

router.post("/", (req, res) => {
   const { email, password } = req.body;

   // Check if user with email already exists in db
   User.findOne({ email })
      .exec()
      .then(user => {
         if (user) {
            // validate password
            bcrypt.compare(password, user.password).then(result => {
               if (result) {
                  // sign jwt
                  jwt.sign(
                     {
                        id: user.id,
                        email: user.email,
                        fullname: `${user.firstName} ${user.lastName}`
                     },
                     "secret",
                     { expiresIn: "1h" },
                     (err, token) => {
                        res.send({
                           message: "Login successful",
                           token
                        });
                     }
                  );
               } else {
                  res.json({
                     message: "email or password incorrect.Try again"
                  });
               }
            });
         } else {
            res.json({
               message: "email or password incorrect.Try again"
            });
         }
      })
      .catch(err => {
         res.status(500).json({
            message: "An error occured",
            err
         });
      });
});

module.exports = router;
