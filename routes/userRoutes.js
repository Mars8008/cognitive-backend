// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Хэрэглэгч нэмэх
router.post('/add', userController.addUser);

// Бүх хэрэглэгчийг авах
router.get('/', userController.getUsers);

// Хэрэглэгчийн мэдээллийг шинэчлэх
router.put('/:userId', userController.updateUser);

// Хэрэглэгчийг устгах
router.delete('/:userId', userController.deleteUser);

module.exports = router;