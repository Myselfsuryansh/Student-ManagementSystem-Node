const express = require("express");
const {getAllCompainceController,createComplainceController } = require("../controllers/complainceController");

const router = express.Router();

router.post('/createComplaince', createComplainceController)  

router.get('/getAllComplaince', getAllCompainceController)


module.exports = router;