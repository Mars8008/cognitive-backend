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
// Хэрэглэгчийн мэдээллийг шинэчлэх
exports.updateResult = async (req, res) => {
  const { resultId } = req.params;  // URL параметрээс хэрэглэгчийн ID-г авах
  const { score, Newtitle, text } = req.body;  // Шинэ мэдээлэл

  // Шинэчлэгдэх мэдээллүүдийг шалгах
  if (!score || !Newtitle || !text) {
    return res.status(400).json({ message: 'Бүх талбаруудыг бөглөнө үү!' });
  }

  try {
    // Хэрэглэгчийг ID-ээр хайж, мэдээллийг шинэчлэх
    const updatedResult = await Result.findByIdAndUpdate(resultId, {
      score,
      Newtitle,
      text
    }, { new: true });  // Шинэ мэдээллийг буцаах

    if (!updatedResult) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    res.status(200).json(updatedResult);  // Шинэчлэгдсэн хэрэглэгчийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Хэрэглэгчийг устгах
exports.deleteResult = async (req, res) => {
  const { resultId } = req.params;  // URL параметрээс хэрэглэгчийн ID-г авах

  try {
    // Хэрэглэгчийг ID-ээр хайж устгах
    const deletedResult = await Result.findByIdAndDelete(resultId);

    if (!deletedResult) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    res.status(200).json({ message: 'Хэрэглэгч амжилттай устгалаа' });  // Устгасан хэрэглэгчийн мэдээллийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
