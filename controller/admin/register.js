const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Method:Post
//Endpoint: /v1/register/register
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: 0,
        message: "Email is already registered",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      success: 1,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: 0,
      message: error.message,
    });
  }
};

//Method:Post
//Endpoint: /v1/register/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send({
        success: 0,
        message: "No user found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: 0,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.send({
      success: 1,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

module.exports = { userRegister, login };
