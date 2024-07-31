
const bankModel = require("../models/bankModels");
const { Country, State, City } = require('country-state-city');
const addBankController = async (req, res) => {
  try {
    const { bankName, bankBranch, accountNumber, AccountType, IFSCCode,district,state } =
      req.body;
    if (
      !bankName ||
      !bankBranch ||
      !accountNumber ||
    !IFSCCode || !AccountType || !state || !district
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



const getBankController = async(req, res)=>{
    try {
        const getAllBankDetails = await bankModel.find({});
    
        if (!getAllBankDetails) {
          return res.status(404).send({
            success: false,
            message: "Bank  not found",
          });
        }
    
        res.status(200).send({
          success: true,
          message: "Data get successful",
          BankDetails: getAllBankDetails,
        });
      } catch (error) {
        console.log(error);
        return res.status(404).send({
          succes: false,
          message: "Error while Getting All Bank Details",
        });
      }
}


const getDistrictandStateController = async (req, res) => {
    try {
        let state = req.query.state || req.body.state;
        let district = req.query.district || req.body.district;
        console.log(state, district)

        // Find all bank details
        let getAllBankDetails = await bankModel.find({});

        // Filter districts based on the state and district
        let filteredDistricts = getAllBankDetails.filter(w => {
            return ( w.state) && ( w.district );
           
        });

        if (!filteredDistricts || filteredDistricts.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Districts not found for the specified state and district",
            });
        }

        // Extract unique districts
        let districts = [...new Set(filteredDistricts.map(bank => bank.district))];

        res.status(200).send({
            success: true,
            message: "Districts retrieved successfully",
            districts: districts,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error while retrieving districts",
        });
    }
};



const getBankNameController = async (req, res) => {
    try {
      
      const allBankDetails = await bankModel.find({}, 'bankName');
  
      if (!allBankDetails || allBankDetails.length === 0) {
        return res.status(404).send({
          success: false,
          message: "No bank details found",
        });
      }
      const bankNames = allBankDetails.map(bank => bank.bankName);
  
      res.status(200).send(bankNames);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error while retrieving bank names",
      });
    }
  };

  const getStateNameController = async (req, res) => {
    try {
      
      const allStateDetails = await bankModel.find({}, 'state');
  
      if (!allStateDetails || allStateDetails.length === 0) {
        return res.status(404).send({
          success: false,
          message: "No State found",
        });
      }
      const states = allStateDetails.map(d => ({ id: d._id, name: d.state }));

  
      return res.status(200).send({
        success: true,
        message: "State Data Fetched Successfully",
        data:states
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error while retrieving state",
      });
    }
  };

  const getDistrictNameController = async (req, res) => {
    try {
      const { stateID } = req.params; 
      console.log(stateID)
  
      if (!stateID) {
        return res.status(400).send({
          success: false,
          message: "State ID is required",
        });
      }

      const districtDetails = await bankModel.find({ state: stateID  }, 'district');
     
       
  
      if (!districtDetails || districtDetails.length === 0) {
        return res.status(404).send({
          success: false,
          message: "No District found for the given State ID",
        });
      }
  
      const districtNames = districtDetails.map(d => d.district);
  
      res.status(200).send(districtNames);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error while retrieving District",
      });
    }
  };

const getAllContriesName = (req, res)=>{
  try {
    const countries = Country.getAllCountries();
    return res.status(200).send({
      success: true,
      message: "Countries Data Fetched Successfully",
      data:countries
    });
  } catch (error) {
    
  }
}

const getAllStateNameOfCountry = (req,res)=>{
  try {
    const countryCode = req.params.isoCode;
    const states = State.getStatesOfCountry(countryCode);
    return res.status(200).send({
      success: true,
      message: "states Data Fetched Successfully",
      data:states
    });
  } catch (error) {
    
  }
}

const getCitiesNameOfStates =(req,res)=>{
  try {
    const stateCode = req.params.id;
    const city = City.getCitiesOfState(stateCode)
    console.log(city)
    
  } catch (error) {
    
  }
}


module.exports = {
  addBankController,
  getBankController,
  getBankNameController,
  getDistrictandStateController,
  getStateNameController,
  getDistrictNameController,
  getAllContriesName,
  getAllStateNameOfCountry,
  getCitiesNameOfStates
};
