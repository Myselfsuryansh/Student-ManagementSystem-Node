const mongoose = require("mongoose");

// Schema

const UserSchema = new mongoose.Schema(
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
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "Phone is Required"],
    },
    usertype: {
      type: String,
      required: [true, "User type is Required"],
      default: "clinet",
      enum: ["clinet", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWLf4PEvvLIU3PhMjvW6VIDeyphLNAIEHSJ5H6Qm9Wew&s",
    },
    answer:{
        type: String,
        required: [true, "Answer is Required"],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
