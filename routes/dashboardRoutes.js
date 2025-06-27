const express = require("express");
const router = express.Router();

const {addReportController,getAllReportsController} = require("../controllers/reportsController")
router.post("/addReportController", addReportController);
router.get("/getAllReportsController", getAllReportsController);


module.exports = router;