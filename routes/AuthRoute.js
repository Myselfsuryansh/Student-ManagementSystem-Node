const express = require("express");
const { studentSignUpController, studentLoginInController } = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/registerStudent", studentSignUpController);


// LOGIN --POST

router.post("/loginStudent",studentLoginInController )


module.exports = router;
