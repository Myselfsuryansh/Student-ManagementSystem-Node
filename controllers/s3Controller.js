const fs = require('fs');
const path = require('path');
const { configureS3Bucket } = require('../utils/s3ConfigHandler');


const initS3BucketController = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../config/S3Config.json');
    console.log(filePath,'FilePath')
    const configRaw = fs.readFileSync(filePath, 'utf-8');
    const config = JSON.parse(configRaw);

    if (!config?.BucketConfiguration?.BucketName) {
      return res.status(400).send({
        success: false,
        message: "Invalid bucket configuration file: BucketName missing",
      });
    }

    const result = await configureS3Bucket(config.BucketConfiguration);

    res.status(200).send({
      success: true,
      message: "S3 bucket initialized successfully",
      result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error while initializing S3 bucket",
      error: error.message,
    });
    console.error("S3 Init Error:", error);
  }
};

module.exports = {
  initS3BucketController
};