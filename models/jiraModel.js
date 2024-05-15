const mongoose = require("mongoose");

const JiraSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: [true, "Project Id is Required"],
    },
    projectName: {
      type: String,
      required: [true, "Project Name is Required"],
    },
    shortName: {
      type: String,
      required: [true, "Short Name is Required"],
    },
    createdDate: {
      type: Date,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Jira", JiraSchema);



