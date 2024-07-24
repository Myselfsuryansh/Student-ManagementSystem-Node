

const express = require("express");
const { registerController, loginController } = require("../controllers/authController");
const {resetPasswordController} = require("../controllers/studentController")
const router = express.Router();

router.post("/register", registerController);


// LOGIN --POST

router.post("/login", loginController);

//reset:

router.post("/resetPassword", resetPasswordController);



module.exports = router;
