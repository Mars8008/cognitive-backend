// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const dailyController = require('../controllers/dailyController')


// Хэрэглэгч нэмэх
router.post('/add', dailyController.addDaily);

// Бүх хэрэглэгчийг авах
router.get('/', dailyController.getDaily);

// Хэрэглэгчийн мэдээллийг шинэчлэх
router.put('/:dailyId', dailyController.updateDaily);

// Хэрэглэгчийг устгах
router.delete('/:dailyId', dailyController.deleteDaily);

module.exports = router;