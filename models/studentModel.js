const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    department: {
      type: String,
    },
    empName: {
      type: String,
      required: [true, "Employee Name is Required"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile Number is Required"],
    },
    gender: {
      type: String,
    },
    joinDate: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    salary: {
      type: String,
    },
    password: {
      type: String,
    },
    confirmPass: {
      type: String,
    },
    empStatus: {
      type: Boolean,
    },
    isClockedIn: { 
      type: Boolean, default: false
     },
    clockInTime: { 
      type: Date
     },
  },

  { timestamps: true }
);

module.exports = mongoose.model("StudentCrud", studentSchema);


