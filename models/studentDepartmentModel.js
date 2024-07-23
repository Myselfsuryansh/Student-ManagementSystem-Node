const mongoose = require("mongoose");

const studentDepartmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
          }
    }

);

module.exports = mongoose.model("studentDepartment", studentDepartmentSchema);