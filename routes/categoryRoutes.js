const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController, getAllCategory, getAllCategoryController, updateCategoryController, deleteCategoryController } = require("../controllers/categoryController");


const router = express.Router();

// Routes
// CREATE Category:

router.post('/createCategory',authMiddleware, createCategoryController)

// Get All

router.get('/getAll', authMiddleware, getAllCategoryController)


// Update Category:

router.put('/update/:id', authMiddleware, updateCategoryController);

// Delete Category

router.delete('/deleteCategory/:id', authMiddleware, deleteCategoryController)

module.exports = router;


