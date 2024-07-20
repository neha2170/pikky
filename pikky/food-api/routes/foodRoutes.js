// routes/foodRoutes.js
const express = require('express');
const router = express.Router();
const { getFoodData } = require('../controller.js/foodController');

router.get('/all', getFoodData);

module.exports = router;
