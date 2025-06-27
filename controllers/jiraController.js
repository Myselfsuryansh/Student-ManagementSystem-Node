const addJiraController = async (req, res) => {
  try {
    const { projectId, projectName, shortName, createdDate } = req.body;
    if (!projectId || !projectName || !shortName) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all fields ",
      });
    }
    const existingJiraNumber = await jiraModel.findOne({ projectId });
    if (existingJiraNumber) {
      return res.status(500).send({
        success: false,
        message: "Project Already Regstered",
      });
    }
    const jiraDeatilsData = new jiraModel({
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
      Message: "Can't create a new Jira Details",
      error,
    });
  }
};

const getAllJiraController = async (req, res) => {
  try {
    const getAllJiraDetails = await jiraModel.find({});

    if (!getAllJiraDetails) {
      return res.status(404).send({
        success: false,
        message: "Jira not found",
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

const updateJiraController = async (req, res) => {
  try {
    const id = req.query.id;
    const { projectId, projectName, shortName, createdDate } = req.body;

    const upateJira = await jiraModel.findByIdAndUpdate(
      id,
      {
        projectId,
        projectName,
        shortName,
        createdDate,
      },
      { new: true }
    );

    if (!upateJira) {
      return res.status(400).send({
        success: false,
        message: "Unable to update the data",
      });
    }

    res.status(200).send({
      succes: true,
      message: "Jira Updated Successfully",
      JiraDetails: upateJira,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      succes: false,
      message: "Error while Updating Jira",
      error,
    });
  }
};

const deleteJiraController = async (req, res) => {
  try {
    const deleteJira = await jiraModel.findByIdAndDelete(req.query.id);
    if (!deleteJira) {
      return res.status(404).status({
        succes: false,
        message: "Jira Not Found",
      });
    }
    res.status(200).send({
      succes: true,
      message: "Jira Deleted Successfully",
      deleteJira: deleteJira,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Deleting Jira",
      error: error,
    });
  }
};

const jiraModel = require("../models/jiraModel");
const ticketModel = require("../models/jiraTicketModel");
const jiraUserModel = require("../models/jiraUserModel");
const addTicketController = async (req, res) => {
  try {
    const {
      ticketId,
      summary,
      status,
      description,
      parentId,
      storyPoint,
      ticketGuid,
      assignedTo,
      createdBy,
      projectId,
      createdDate,
    } = req.body;
    if (!summary || !description || !assignedTo) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all fields ",
      });
    }
    const existingTicketNumber = await ticketModel.findOne({ ticketId });
    if (existingTicketNumber) {
      return res.status(500).send({
        success: false,
        message: "Ticket Already Regstered",
      });
    }
    const ticketDeatilsData = new ticketModel({
      ticketId,
      summary,
      status,
      description,
      parentId,
      storyPoint,
      ticketGuid,
      assignedTo,
      createdBy,
      projectId,
      createdDate,
    });
    await ticketDeatilsData.save();
    res.status(200).send({
      success: true,
      message: "Successfully created",
      Details: ticketDeatilsData,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      Message: "Can't create a new Ticket Details",
      error,
    });
  }
};

const getTicketController = async (req, res) => {
  try {
    const getAllTicketDetails = await ticketModel.find({});

    if (!getAllTicketDetails) {
      return res.status(404).send({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Data get successful",
      Details: getAllTicketDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      Message: "Can't create a new Ticket",
      error,
    });
  }
};

const GetTicketsByProjectId = async (req, res) => {
  try {
    const projectId = req.query.id;

    if (!projectId) {
      return res.status(400).send({
        success: false,
        message: "Project ID is missing in the query parameters",
      });
    }
    const tickets = await jiraModel.find({ projectId: projectId });
    console.log(tickets,'qwertyuiop')
    if (!tickets || tickets.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No tickets found for the specified project ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Tickets retrieved successfully",
      tickets: tickets,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      Message: "Can't get the project Id",
      error,
    });
  }
};

const getAllProjectByIdController = async (req, res) => {
  try {
    const projectId = await jiraModel.findById(req.query.id);
    if (!projectId) {
      res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User Found",
      projectId,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error while getting Specific User",
      error,
    });
  }
};

const updateTicketController = async (req, res) => {
  try {
    const id = req.query.id;
    const {
      ticketId,
      summary,
      status,
      description,
      parentId,
      storyPoint,
      ticketGuid,
      assignedTo,
      createdBy,
      projectId,
    } = req.body;

    const upateTicket = await ticketModel.findByIdAndUpdate(
      id,
      {
        ticketId,
        summary,
        status,
        description,
        parentId,
        storyPoint,
        ticketGuid,
        assignedTo,
        createdBy,
        projectId,
      },
      { new: true }
    );

    if (!upateTicket) {
      return res.status(400).send({
        success: false,
        message: "Unable to update the data",
      });
    }

    res.status(200).send({
      succes: true,
      message: "Ticket Updated Successfully",
      TicketDetails: upateTicket,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      succes: false,
      message: "Error while Updating Ticket",
      error,
    });
  }
};

const deleteTicketController = async (req, res) => {
  try {
    const deleteTicket = await ticketModel.findByIdAndDelete(req.query.id);
    console.log(deleteTicket);
    if (!deleteTicket) {
      return res.status(404).status({
        succes: false,
        message: "Ticket Not Found",
      });
    }
    res.status(200).send({
      succes: true,
      message: "Ticket Deleted Successfully",
      deleteTicket: deleteTicket,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      Message: "Can't Delete a Ticket",
      error: error,
    });
  }
};

const RegisterUserController = async (req, res) => {
  try {
    const { userId,userName, email, password } = req.body;
    if (!userId,!userName || !email || !password) {
      return res.status(500).send({
        success: false,
        message: "Pleae Enter all fields",
      });
    }
    const existing = await jiraUserModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registered, Please Login",
      });
    }
    // var salt = bcrypt.genSaltSync(10);
    // const hashPasword = await bcrypt.hash(password, salt);

    const user = await jiraUserModel.create({
      userId,
      userName,
      email,
      password,
    });
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user:user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Signing",
      error,
    });
  }
};

const getUserController = async (req, res) => {
  try {
    const getAllUserDetails = await jiraUserModel.find({});

    if (!getAllUserDetails) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Users get successful",
      Details: getAllUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      Message: "Can't create a new User",
      error,
    });
  }
};


const GetTicketsAssignedByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User ID is missing in the query parameters",
      });
    }

    const user = await jiraUserModel.aggregate([
      {
        $match: {
          userId: userId
        }
      }
    ]);

    if (!user || user.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No user found for the specified user ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "User retrieved successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};


const updateUserController = async (req, res) => {
  try {
    const id = req.query.id;
    const { userName, email, password } = req.body;

    const upateUser = await jiraUserModel.findByIdAndUpdate(
      id,
      {
        userName,
        email,
        password,
      },
      { new: true }
    );

    if (!upateUser) {
      return res.status(400).send({
        success: false,
        message: "Unable to update the data",
      });
    }

    res.status(200).send({
      succes: true,
      message: "User Updated Successfully",
      UserDetails: upateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      succes: false,
      message: "Error while Updating User",
      error,
    });
  }
};

const getAllUserByIdController = async (req, res) => {
  try {
    const userId = await jiraUserModel.findById(req.query.id);
    if (!userId) {
      res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "User Found",
      userId,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error while getting Specific User",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const deleteUser = await jiraUserModel.findByIdAndDelete(req.query.id);
    console.log(deleteUser);
    if (!deleteUser) {
      return res.status(404).status({
        succes: false,
        message: "Ticket Not Found",
      });
    }
    res.status(200).send({
      succes: true,
      message: "User Deleted Successfully",
      deleteTicket: deleteUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      Message: "Can't Delete a Ticket",
      error: error,
    });
  }
};


module.exports = {
  addJiraController,
  getAllJiraController,
  updateJiraController,
  deleteJiraController,
  addTicketController,
  getTicketController,
  updateTicketController,
  deleteTicketController,
  RegisterUserController,
  getUserController,
  updateUserController,
  deleteUserController,
  GetTicketsByProjectId,
  GetTicketsAssignedByUserId,
  getAllUserByIdController,
  getAllProjectByIdController
};
