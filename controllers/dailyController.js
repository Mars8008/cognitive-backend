const Daily = require('../models/Daily')

// Шинэ хэрэглэгч нэмэх
exports.addDaily = async (req, res) => {
  const { learningMins, socialMins, steps, sleepHrs, stress} = req.body;

  // Хэрэглэгчийн утгууд шалгах
  if (!learningMins || ! socialMins || !steps || !sleepHrs || !stress) {
    return res.status(400).json({ message: 'Бүх талбаруудыг бөглөнө үү!' });
  }

  // Шинэ хэрэглэгч үүсгэх
  const newDaily = new Daily({
    learningMins,
    socialMins,
    steps,
    sleepHrs,
    stress

  });

  try {
    const savedDaily = await newDaily.save();
    res.status(201).json(savedDaily);  // Хадгалсан хэрэглэгчийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Бүх хэрэглэгчийг авах
exports.getDaily = async (req, res) => {
  try {
    const daily = await Daily.find();  // Бүх хэрэглэгчийг авах
    res.status(200).json(daily);  // Бүх хэрэглэгчийн мэдээллийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Хэрэглэгчийн мэдээллийг шинэчлэх
exports.updateDaily = async (req, res) => {
  const { dailyId } = req.params;  // URL параметрээс хэрэглэгчийн ID-г авах
  const { learningMins, socialMins, steps, sleepHrs, stress } = req.body;  // Шинэ мэдээлэл

  // Шинэчлэгдэх мэдээллүүдийг шалгах
  if (!learningMins || ! socialMins || !steps || !sleepHrs || !stress) {
    return res.status(400).json({ message: 'Бүх талбаруудыг бөглөнө үү!' });
  }

  try {
    // Хэрэглэгчийг ID-ээр хайж, мэдээллийг шинэчлэх
    const updatedDaily = await Daily.findByIdAndUpdate(dailyId, {
    learningMins,
    socialMins,
    steps,
    sleepHrs,
    stress
    }, { new: true });  // Шинэ мэдээллийг буцаах

    if (!updatedDaily) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    res.status(200).json(updatedDaily);  // Шинэчлэгдсэн хэрэглэгчийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Хэрэглэгчийг устгах
exports.deleteDaily = async (req, res) => {
  const { dailyId } = req.params;  // URL параметрээс хэрэглэгчийн ID-г авах

  try {
    // Хэрэглэгчийг ID-ээр хайж устгах
    const deletedDaily = await Daily.findByIdAndDelete(dailyId);

    if (!deletedDaily) {
      return res.status(404).json({ message: 'Хэрэглэгч олдсонгүй' });
    }

    res.status(200).json({ message: 'Хэрэглэгч амжилттай устгалаа' });  // Устгасан хэрэглэгчийн мэдээллийг буцаах
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
