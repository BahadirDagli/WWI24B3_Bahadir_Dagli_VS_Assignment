const express = require('express');
const router = express.Router();
const spielrundeController = require('../controllers/spielrundeController');

router.get('/', spielrundeController.getAllSpielrunden);
router.get('/:id', spielrundeController.getSpielrundeById);
router.post('/', spielrundeController.createSpielrunde);
router.patch('/:id', spielrundeController.updateSpielrunde);
router.delete('/:id', spielrundeController.deleteSpielrunde);

module.exports = router;