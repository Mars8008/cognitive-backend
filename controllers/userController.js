// controllers/userController.js
const User = require('../models/User');

// Шинэ хэрэглэгч нэмэх
exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Хэрэглэгчийн утгууд шалгах
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Бүх талбаруудыг бөглөнө үү!' });
  }

  // Шинэ хэрэглэгч үүсгэх
  const newUser = new User({
    name,
    email,
    password
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);  // Хадгалсан хэрэглэгчийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Бүх хэрэглэгчийг авах
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();  // Бүх хэрэглэгчийг авах
    res.status(200).json(users);  // Бүх хэрэглэгчийн мэдээллийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Хэрэглэгчийн мэдээллийг шинэчлэх
exports.updateUser = async (req, res) => {
  const { userId } = req.params;  // URL параметрээс хэрэглэгчийн ID-г авах
  const { name, email, password } = req.body;  // Шинэ мэдээлэл

  // Шинэчлэгдэх мэдээллүүдийг шалгах
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Бүх талбаруудыг бөглөнө үү!' });
  }

  try {
    // Хэрэглэгчийг ID-ээр хайж, мэдээллийг шинэчлэх
    const updatedUser = await User.findByIdAndUpdate(userId, {
      name,
      email,
      password
    }, { new: true });  // Шинэ мэдээллийг буцаах

    if (!updatedUser) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    res.status(200).json(updatedUser);  // Шинэчлэгдсэн хэрэглэгчийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Хэрэглэгчийг устгах
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;  // URL параметрээс хэрэглэгчийн ID-г авах

  try {
    // Хэрэглэгчийг ID-ээр хайж устгах
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    res.status(200).json({ message: 'Хэрэглэгч амжилттай устгалаа' });  // Устгасан хэрэглэгчийн мэдээллийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
