const mongoose = require("mongoose");


const employeeFilterSchema = new mongoose.Schema({
    name:{
        type:String
    }
});

module.exports = mongoose.model('employeeFilter',employeeFilterSchema)