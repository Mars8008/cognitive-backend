// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const resultController= require('../controllers/resultController')


// Хэрэглэгч нэмэх
router.post('/add', resultController.addResult);

// Бүх хэрэглэгчийг авах
router.get('/', resultController.getResult);

// Хэрэглэгчийн мэдээллийг шинэчлэх
router.put('/:resultId', resultController.updateResult);

// Хэрэглэгчийг устгах
router.delete('/:resultId', resultController.deleteResult);

module.exports = router;