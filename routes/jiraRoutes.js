const express = require("express");
const { addJiraController, getAllJiraController, updateJiraController, deleteJiraController, addTicketController, getTicketController, updateTicketController, deleteTicketController, RegisterUserController, getUserController, updateUserController, deleteUserController, GetTicketsByProjectId, GetTicketsAssignedByUserId, getAllUserByIdController, getAllProjectByIdController, updateProjectController } = require("../controllers/jiraController");
const router = express.Router();

router.post("/registerJiraDetails", addJiraController);
router.get("/getJiraDetails",getAllJiraController);
router.put('/updateJiraDetails', updateJiraController)
router.delete('/deleteJira/', deleteJiraController);


router.post("/registerUser",RegisterUserController)
router.get("/getUser", getUserController)
router.put("/updateUser/", updateUserController)
router.get('/getAllUserById/', getAllUserByIdController)
router.delete("/deleteUser/",deleteUserController)
router.get('/GetTicketsAssignedByUserId', GetTicketsAssignedByUserId)



router.post('/registerTicketDetails',addTicketController)
router.get('/getTicketDetails',getTicketController);
router.get('/GetTicketsByProjectId/',GetTicketsByProjectId)
router.put('/updateTicketDetails/', updateTicketController);
router.delete('/deleteTicket/', deleteTicketController)
router.get('/getAllProjectById/',getAllProjectByIdController)

module.exports = router;