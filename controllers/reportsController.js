const reportModel =require('../models/reportModel');

const addReportController = async (req, res) => {
    try {
      const { projectId, projectName, shortName } = req.body;
      if (!projectId || !projectName || !shortName) {
        return res.status(404).send({
          success: false,
          message: "Please Provide all fields ",
        });
      }
      const existingJiraNumber = await reportModel.findOne({ projectId });
      if (existingJiraNumber) {
        return res.status(500).send({
          success: false,
          message: "Project Already Regstered",
        });
      }
      const jiraDeatilsData = new reportModel({
        projectId,
        projectName,
        shortName,
      });
      await jiraDeatilsData.save();
      res.status(200).send({
        success: true,
        message: "Successfully created",
        Details: jiraDeatilsData,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({
        success: false,
        Message: "Can't create a new Reports Details",
        error,
      });
    }
  };


  const getAllReportsController = async (req, res) => {
    try {
      const getAllJiraDetails = await reportModel.find({});
  
      if (!getAllJiraDetails) {
        return res.status(404).send({
          success: false,
          message: "Reports not found",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Data get successful",
        Details: getAllJiraDetails,
      });
    } catch (error) {
      console.log(error);
      return res.status(404).send({
        success: false,
        Message: "Can't create a new Bank Details",
        error,
      });
    }
  };
  
  module.exports = {
    addReportController,getAllReportsController
  }