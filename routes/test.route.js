const express = require('express');
const { testUserController } = require('../controllers/testController');

// router object

const router = express.Router();


// router GET|POST|DELETE|PUT|PATCH

router.get('/test-user',testUserController) 


// export

module.exports =router;