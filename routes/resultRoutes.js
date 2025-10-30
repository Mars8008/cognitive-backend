// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const resultController= require('../controllers/resultController')


// Хэрэглэгч нэмэх
router.post('/add', resultController.addResult);

// Бүх хэрэглэгчийг авах
router.get('/', resultController.getResult);

// // Хэрэглэгчийн мэдээллийг шинэчлэх
// router.put('/:userId', userController.updateUser);

// // Хэрэглэгчийг устгах
// router.delete('/:userId', userController.deleteUser);

module.exports = router;