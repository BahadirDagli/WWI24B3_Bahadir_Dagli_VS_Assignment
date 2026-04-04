const express = require('express');
const router = express.Router();
const spielerController = require('../controllers/spielerController');

router.get('/', spielerController.getAllSpieler);

module.exports = router;