import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../model/user";

const login = (req, res) => {
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
};

export default login;
