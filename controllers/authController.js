const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// const userModel = require("../models/userModel")
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;

    if (!userName || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provde all Fields",
      });
    }
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already Regstered, Please Login",
      });
    }

    // Hashing the password
    var salt = bcrypt.genSaltSync(10);
    const hashPasword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password: hashPasword,
      address,
      phone,
      answer
    });
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register Api",
      error: error,
    });
  }
};

// LOGIN

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found ",
      });
    }

    // Check Password with hash :

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(500).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const JWT_SECRET ="DATA"
    const token = JWT.sign({id: user._id}, JWT_SECRET,{
        expiresIn:"7d",
    })
    if (user) {
      res.status(200).send({
        success: true,
        message: "Login Suuccessfully",
        token,
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login Api",
    });
  }
};

module.exports = { registerController, loginController };
