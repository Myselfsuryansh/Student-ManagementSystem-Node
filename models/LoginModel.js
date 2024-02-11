const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema(
  {
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

module.exports = mongoose.model("Login", LoginSchema);
