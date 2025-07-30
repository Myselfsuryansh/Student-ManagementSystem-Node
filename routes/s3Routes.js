const express = require("express");
const {initS3BucketController } = require("../controllers/s3Controller");


const router = express.Router();

router.get('/init-s3', initS3BucketController)

module.exports = router;