import User from "../../model/user";

/**
 * Handle user login endpoint
 *
 * @param {Object} req
 * @param {Object} res
 */

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists and if password is valid
    const user = await User.findOne({ email });

    // Return error if user dosen't exist or password is incorrect
    if (!user) {
      return res.status(401).json({
        error: "email or password incorrect"
      });
    }

    const passwordIsCorrect = user.comparePasswords(password);

    if (!passwordIsCorrect) {
      return res.status(401).json({
        error: "email or password incorrect"
      });
    }

    const token = await user.generateToken();
    const { id, userName } = user;

    return res.status(200).json({
      sucess: "Login successful",
      data: {
        id,
        userName,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong"
    });
  }
};

export default login;
