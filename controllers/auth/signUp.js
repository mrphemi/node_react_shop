import bcrypt from "bcryptjs";

import User from "../../model/user";

const signUp = (req, res) => {
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
               errorMsg: "User already exists"
            });
         } else {
            // Hash user password and store user in db
            bcrypt.hash(details.password, 10, (err, hash) => {
               newUser.password = hash;
               newUser.save().then(userInfo => {
                  // user created sucessfully
                  res.status(201).json({
                     message:
                        "Sign Up successful, please log in to view your profile",
                     user: {
                        id: userInfo.id,
                        email: userInfo.email,
                        fullname: `${userInfo.firstName} ${userInfo.lastName}`
                     }
                  });
               });
            });
         }
      })
      .catch(err => {
         res.status(500).json({
            errorMsg: "An error occured",
            err
         });
      });
};

export default signUp;
