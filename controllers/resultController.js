const Result = require('../models/Result');  // Models-ийг зөв импортлох

// Шинэ хэрэглэгч нэмэх
exports.addResult = async (req, res) => {
  const { score, Newtitle, text } = req.body;

  // Хэрэглэгчийн утгууд шалгах
  if (!score || ! Newtitle || !text) {
    return res.status(400).json({ message: 'Бүх талбаруудыг бөглөнө үү!' });
  }

  // Шинэ хэрэглэгч үүсгэх
  const newResult = new Result({
    score,
    Newtitle,
    text
  });

  try {
    const savedResult = await newResult.save();
    res.status(201).json(savedResult);  // Хадгалсан хэрэглэгчийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Бүх хэрэглэгчийг авах
exports.getResult = async (req, res) => {
  try {
    const result = await Result.find();  // Бүх хэрэглэгчийг авах
    res.status(200).json(result);  // Бүх хэрэглэгчийн мэдээллийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Бүх хэрэглэгчийг авах
exports.getResult = async (req, res) => {
  try {
    const result = await Result.find();  // Бүх хэрэглэгчийг авах
    res.status(200).json(result);  // Бүх хэрэглэгчийн мэдээллийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// // Хэрэглэгчийн мэдээллийг шинэчлэх
// exports.updateUser = async (req, res) => {
//   const { userId } = req.params;  // URL параметрээс хэрэглэгчийн ID-г авах
//   const { name, email, password } = req.body;  // Шинэ мэдээлэл

//   // Шинэчлэгдэх мэдээллүүдийг шалгах
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'Бүх талбаруудыг бөглөнө үү!' });
//   }

//   try {
//     // Хэрэглэгчийг ID-ээр хайж, мэдээллийг шинэчлэх
//     const updatedUser = await User.findByIdAndUpdate(userId, {
//       name,
//       email,
//       password
//     }, { new: true });  // Шинэ мэдээллийг буцаах

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
//     }

//     res.status(200).json(updatedUser);  // Шинэчлэгдсэн хэрэглэгчийг буцаах
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// // Хэрэглэгчийг устгах
// exports.deleteUser = async (req, res) => {
//   const { userId } = req.params;  // URL параметрээс хэрэглэгчийн ID-г авах

//   try {
//     // Хэрэглэгчийг ID-ээр хайж устгах
//     const deletedUser = await User.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
//     }

//     res.status(200).json({ message: 'Хэрэглэгч амжилттай устгалаа' });  // Устгасан хэрэглэгчийн мэдээллийг буцаах
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
