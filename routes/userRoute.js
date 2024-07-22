const express = require("express");
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// GET USER DATA

router.get("/getUser",  getUserController);


// USER UPDATE

router.put("/updateUser",  updateUserController);

// Passwords update

router.put("/passwords", updatePasswordController)


// Reset Password


router.post('/resetPassword',  resetPasswordController)


// Delete User


router.delete("/deleteUser/:id",  deleteUserController)

module.exports = router;
