const express = require('express');
const router = express.Router();
const spielerController = require('../controllers/spielerController');

router.get('/', spielerController.getAllSpieler);
router.get('/:id', spielerController.getSpielerById);
router.post('/', spielerController.createSpieler);
router.patch('/:id', spielerController.updateSpieler);

module.exports = router;