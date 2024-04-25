const express = require("express");
const {addBankController,getBankController,getBankNameController,getDistrictandStateController,getDistrictNameController ,getStateNameController} = require("../controllers/bankController");
const router = express.Router();

router.post("/registerBankDetails", addBankController);
router.get("/getAllBankDetails", getBankController);
router.get("/getSpecificBankDetails",getBankNameController);
router.post('/getDistrictandState',getDistrictandStateController);
router.get("/getStateName",getStateNameController);
router.get("/getDistrictName",getDistrictNameController);
module.exports = router;