const express = require("express");
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// GET USER DATA

router.get("/getUser", authMiddleware, getUserController);


// USER UPDATE

router.put("/updateUser", authMiddleware, updateUserController);

// Passwords update

router.put("/passwords", authMiddleware,updatePasswordController)


// Reset Password


router.post('/resetPassword', authMiddleware, resetPasswordController)


// Delete User


router.delete("/deleteUser/:id", authMiddleware, deleteUserController)

module.exports = router;
