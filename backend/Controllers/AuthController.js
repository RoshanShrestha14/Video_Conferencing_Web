const UserModel = require("../Models/userModel");
const { createSecretToken } = require("../utils/secretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res) => {
  try {
    const { fullName, userName, password } = req.body;
    if (!fullName ||!userName || !password) {
      return res.status(400).json({ 
        message: "All fields are required",
        success: false 
      });
    }
    const existingUser = await UserModel.findOne({ userName });
    if (existingUser) {
     return res.status(409).json({ 
        message: "User already exists",
        success: false 
      });
    }
    const user = await UserModel.create({ fullName, userName, password });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (error) {
    console.error("Signup Error",error);
    res.status(500).json({ 
      message: "Internal server error",
      success: false,
      error: error.message 
    });

  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ 
        message: "All fields are required",
        success: false 
      });
    }

    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.status(401).json({ 
        message: "Invalid credentials",
        success: false 
      });
    }
   const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: "Invalid credentials", 
        success: false 
      });
    }
   const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    const userResponse = {
      id: user._id,
      fullName: user.fullName,
      userName: user.userName
    };

    res.status(200).json({ 
      message: "Login successful", 
      success: true,
      user: userResponse 
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Internal server error",
      success: false 
    });
  }
};