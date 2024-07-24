const express = require("express");
const {
  createStudentController,
  departmentDataController,
  employeeFilterController,
  getAllStudentController,
  clockInController,
  updateStudentController,
  deleteStuentController,
  getAllStudentByIdController,
  changePasswordController,
  getUserIdByEmailController,
  resetPasswordController,
  clockOutController,
  takeBreakController,
} = require("../controllers/studentController");

const router = express.Router();

// Post Request:

router.post("/CreatePost", createStudentController);

router.get("/getAllDepartment", departmentDataController);

router.get("/getAllEmployeeFilter", employeeFilterController);

router.get("/getAllStudent", getAllStudentController);

router.put("/updateStudent/:id", updateStudentController);

router.get("/getStudentBySpecificId/:id", getAllStudentByIdController);

router.delete("/deleteStudent/:id", deleteStuentController);

router.post("/changePassword", changePasswordController);

router.post("/clockIn", clockInController);

router.post("/clockOut", clockOutController);

router.post("/takeBreak", takeBreakController);

router.get("/getUserIdByEmail", getUserIdByEmailController);

module.exports = router;
