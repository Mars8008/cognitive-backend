const express = require('express');
const router = express.Router();
const baselineController = require('../controllers/baselineController');

// Create
router.post('/', baselineController.createBaseline);

// Read
router.get('/', baselineController.getAllBaselines);
router.get('/:id', baselineController.getBaselineById);

// Update
router.put('/:id', baselineController.updateBaseline);

// Delete
router.delete('/:id', baselineController.deleteBaseline);

module.exports = router;