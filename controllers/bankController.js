const bankModel = require("../models/bankModels");
const { Country, State } = require("country-state-city");
const cities = require("../cities.json");
const banks = require('../banks.json')
const addBankController = async (req, res) => {
  try {
    const {
      bankName,
      bankBranch,
      accountNumber,
      AccountType,
      IFSCCode,
      district,
      state,
      country
    } = req.body;
    if (
      !bankName ||
      !bankBranch ||
      !accountNumber ||
      !IFSCCode ||
      !AccountType ||
      !state ||
      !district ||
      !country
    ) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all fields ",
      });
    }
    const existingAccountNumber = await bankModel.findOne({ accountNumber });
    if (existingAccountNumber) {
      return res.status(500).send({
        success: false,
        message: "Account Number Already Regstered",
      });
    }
    const bankDeatilsData = new bankModel({
      bankName,
      bankBranch,
      district,
      state,
      accountNumber,
      AccountType: Array.isArray(AccountType) ? AccountType : [AccountType],
      IFSCCode,
    });
    await bankDeatilsData.save();
    res.status(200).send({
      success: true,
      message: "Successfully created",
      bankDetails: bankDeatilsData,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      Message: "Can't create a new Bank Details",
      error,
    });
  }
};

// const getBankController = (req, res) => {
//   try {
//     const getAllBankDetails = banks;
//     if (!getAllBankDetails) {
//       return res.status(404).send({
//         success: false,
//         message: "Bank  not found",
//       });
//     }

//     res.status(200).send({
//       success: true,
//       message: "Data get successful",
//       BankDetails: getAllBankDetails,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(404).send({
//       succes: false,
//       message: "Error while Getting All Bank Details",
//     });
//   }
// };

const getAllContriesName = (req, res) => {
  try {
    const countries = Country.getAllCountries();
    return res.status(200).send({
      success: true,
      message: "Countries Data Fetched Successfully",
      data: countries,
    });
  } catch (error) {}
};

const getAllStateNameOfCountry = (req, res) => {
  try {
    const countryCode = req.query.isoCode;
    const states = State.getStatesOfCountry(countryCode);
    return res.status(200).send({
      success: true,
      message: "states Data Fetched Successfully",
      data: states,
    });
  } catch (error) {}
};

const getCitiesNameOfStates = (req, res) => {
  try {
    const stateCode = req.query.state_code;
    console.log("stateCode is the paramas", stateCode);
    const citiesFilePath = cities;
    const city = citiesFilePath.filter((city) => city.state_code === stateCode);
    if (cities.length === 0) {
      console.log(`No cities found for state code: ${stateCode}`);
    }
    return res.status(200).send({
      success: true,
      message: "Cities Data Fetched Successfully",
      data: city,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "An error occurred while fetching cities data",
      error: error.message,
    });
  }
};

module.exports = {
  addBankController,
  getAllContriesName,
  getAllStateNameOfCountry,
  getCitiesNameOfStates,
};
