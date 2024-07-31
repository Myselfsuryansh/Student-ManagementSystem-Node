const express = require("express");
const {
  addBankController,
  getBankController,
  getAllContriesName,
  getAllStateNameOfCountry,
  getBankNameController,
  getDistrictandStateController,
  getDistrictNameController,
  getStateNameController,
} = require("../controllers/bankController");
const router = express.Router();

router.post("/registerBankDetails", addBankController);
router.get("/getAllBankDetails", getBankController);
router.get("/getSpecificBankDetails", getBankNameController);
router.post("/getDistrictandState", getDistrictandStateController);
router.get("/getStateName", getStateNameController);
router.get("/getDistrictName/:stateID", getDistrictNameController);
router.get("/getAllCountries", getAllContriesName);
router.get("/getAllStatesOfCountries/:isoCode", getAllStateNameOfCountry);
// router.get("/getAllCitiesOfStates/:id", getCitiesNameOfStates)
module.exports = router;
