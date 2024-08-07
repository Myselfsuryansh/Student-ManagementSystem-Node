const express = require("express");
const {
  addBankController,getBankController,
  getAllContriesName,
  getCitiesNameOfStates,
  getAllStateNameOfCountry,
} = require("../controllers/bankController");
const router = express.Router();

router.post("/registerBankDetails", addBankController);
router.get('/getBankDetails',getBankController)
router.get("/getAllCountries", getAllContriesName);
router.get("/getAllStatesOfCountries", getAllStateNameOfCountry);
router.get("/getAllCitiesOfStates", getCitiesNameOfStates)
module.exports = router;
