const mongoose = require("mongoose");

// Schema

const AuthSchema = new mongoose.Schema(
  {
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
  },

  { timestamps: true }
);

module.exports = mongoose.model("Auth", AuthSchema);
