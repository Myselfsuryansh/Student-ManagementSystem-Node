const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
// GET USER INFO:
const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    // console.log(user._id)

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User get Successsfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User Api",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    const { userName, phone } = req.body;
    if (userName) {
      user.userName = userName;
    }
    if (phone) {
      user.phone = phone;
    }
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update User",
      error,
    });
  }
};
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide old or new Password",
      });
    }
    var salt = bcrypt.genSaltSync(10);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashPasword = await bcrypt.hash(newPassword, salt);
    user.password = hashPasword;

    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Pasword",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all Fields",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashPasword = await bcrypt.hash(newPassword, salt);
    user.password = hashPasword;
    await user.save();
    res.status(200).send({
      message: true,
      message: "Password Resettd Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Reset Password",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error during Deleting User",
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
};
