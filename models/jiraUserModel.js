const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
      },
    userName: {
      type: String,
      required: [true, "User Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
  })

  
module.exports = mongoose.model("UserData",userSchema);