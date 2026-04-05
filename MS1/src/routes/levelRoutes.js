const express = require('express');
const router = express.Router();
const levelController = require('../controllers/levelController');

router.get('/', levelController.getAllLevel);
router.get('/:id', levelController.getLevelById);
router.post('/', levelController.createLevel);
router.patch('/:id', levelController.updateLevel);
router.delete('/:id', levelController.deleteLevel);

module.exports = router;