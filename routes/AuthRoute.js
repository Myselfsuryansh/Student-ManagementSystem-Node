const express = require("express");
const { studentSignUpController, studentLoginInController } = require("../controllers/studentController");
const router = express.Router();

router.post("/registerStudent", studentSignUpController);


// LOGIN --POST

router.post("/loginStudent",studentLoginInController )


module.exports = router;
