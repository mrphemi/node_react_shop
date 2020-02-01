import User from "../../model/user";

/**
 * Handle user registration endpoint
 *
 * @param {Object} req
 * @param {Object} res
 *
 */

const signUp = async (req, res) => {
  // get user details from request body
  const { email, password, userName } = req.body;

  // create new user
  const newUser = new User({ email, password, userName });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // user already exists in db
      return res.status(403).json({
        error: "User already exists"
      });
    } else {
      const user = await User.create(newUser);
      const { id, userName } = user;
      return res.status(201).json({
        success: "Account registered.",
        data: {
          id,
          userName
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

export default signUp;
