const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../model/user");

router.post("/", (req, res) => {
   // get user details from request body
   const details = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
   };

   // create new user
   const newUser = new User(details);

   // check if user already exists in db
   User.findOne({ email: details.email })
      .exec()
      .then(user => {
         if (user) {
            // user already exists in db
            res.json({
               message: "User already exists"
            });
         } else {
            // Hash user password and store user in db
            bcrypt.hash(details.password, 10, (err, hash) => {
               newUser.password = hash;
            });
            return newUser.save();
         }
      })
      .then(userInfo => {
         // user created sucessfully
         res.status(201).json({
            message: "Sign Up successful, please log in to view your profile",
            user: {
               id: userInfo.id,
               email: userInfo.email,
               fullname: `${userInfo.firstName} ${userInfo.lastName}`
            }
         });
      })
      .catch(err => {
         res.status(500).json({
            message: "An error occured",
            err
         });
      });
});

module.exports = router;
