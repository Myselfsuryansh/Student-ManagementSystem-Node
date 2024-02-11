const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { CreaterestaurantController, getAllRestaurantControllers, getAllRestaurantByIdControllers, deleteRestaurantController } = require("../controllers/restaurantController");

const router = express.Router();

// CREATE

router.post('/create',authMiddleware,CreaterestaurantController);

// Get all the restaurants
router.get('/getAll',authMiddleware, getAllRestaurantControllers)


// Get restaurant by id

router.get('/getAll/:id',authMiddleware, getAllRestaurantByIdControllers)

// Delete a restaurant

router.delete('/deleteRestaurant/:id',authMiddleware, deleteRestaurantController)
module.exports = router;
