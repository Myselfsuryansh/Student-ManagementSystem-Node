const complainceModel = require("../models/complainceModel");


const createComplainceController = async (req, res) => {
  try {
    const { category, status, dueDate } = req.body;
    if (!category || !dueDate) {
      return res.status(400).send({
        success: false,
        message: "Category and Due Date are required.",
      });
    }
    const newIssue = new complainceModel({
      category,
      status, 
      dueDate,
    });

    await newIssue.save();

    res.status(201).send({
      success: true,
      message: "Compliance issue created successfully.",
      data: newIssue,
    });
  } catch (error) {
    console.error("Create Compliance Issue Error:", error);
    res.status(500).send({
      success: false,
      message: "Server error while creating compliance issue.",
      error: error.message,
    });
  }
};
const getAllCompainceController = async (req, res) => {
  try {
    const getCompaince = await complainceModel.find({});

    if (!getCompaince) {
      return res.status(404).send({
        success: false,
        messaage: "Can't get Complaince",
      });
    }

    res.status(200).send({
      success: true,
      message: "Complaince Get Successfully",
      getCount: getCompaince.length,
      getCompaince,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


module.exports = {
createComplainceController,
getAllCompainceController
};
