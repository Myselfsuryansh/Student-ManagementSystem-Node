const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createStudentController, getAllStudentController, updateStudentController, deleteStuentController, getAllStudentByIdController, changePasswordController, getUserIdByEmailController } = require("../controllers/studentController");
const { deleteCategoryController } = require("../controllers/categoryController");


const router = express.Router();

// Post Request:

router.post('/CreatePost', createStudentController)

router.get('/getAllStudent', getAllStudentController )

router.put('/updateStudent/:id', updateStudentController)

router.get('/getStudentBySpecificId/:id',getAllStudentByIdController )

router.delete('/deleteStudent/:id', deleteStuentController);

router.post('/changePassword',changePasswordController );

router.get('/getUserIdByEmail', getUserIdByEmailController);



module.exports = router;


