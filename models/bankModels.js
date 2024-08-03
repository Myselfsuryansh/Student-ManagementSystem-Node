const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema(
  {
    bankName: {
      type: String,
    },
    country: {
      type: String,
    },
    state:{
        type: String,
    },
    district:{
        type: String,
    },
    bankBranch: {
      type: String,
      required: [true, "Bank Branch is Required"],
    },
    accountNumber: {
      type: String,
      required: [true, "Account Number is Required"],
    },
    AccountType: {
      type: [String],
    },
    IFSCCode: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("bankDetails", bankSchema);


