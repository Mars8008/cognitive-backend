const DailyHabit = require('../models/DailyHabit');


exports.createHabit = async (req, res) => {
  try {
    const habit = new DailyHabit({
      userId: req.body.userId,
      date: req.body.date || new Date(),
      learningMins: req.body.learningMins,
      socialMins: req.body.socialMins,
      steps: req.body.steps,
      sleepHours: req.body.sleepHours,
      stress: req.body.stress,
      habitScore: req.body.habitScore // хүсвэл гараар өгч болно
    });

    const savedHabit = await habit.save();
    res.status(201).json(savedHabit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET — бүх habit жагсаалт (сонгосон хэрэглэгчийн)
exports.getHabits = async (req, res) => {
  try {
    const query = req.query.userId ? { userId: req.query.userId } : {};
    const habits = await DailyHabit.find(query).sort({ date: -1 });
    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET — нэг habit бичлэг (id-гаар)
exports.getHabitById = async (req, res) => {
  try {
    const habit = await DailyHabit.findById(req.params.id);
    if (!habit) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT — шинэчлэх
exports.updateHabit = async (req, res) => {
  try {
    const updated = await DailyHabit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE — устгах
exports.deleteHabit = async (req, res) => {
  try {
    const deleted = await DailyHabit.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET — 7 хоногийн дундаж (dashboard-д зориулсан)
exports.getWeeklyStats = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: 'userId required' });

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const habits = await DailyHabit.find({
      userId,
      date: { $gte: last7Days }
    }).sort({ date: 1 });

    if (!habits.length)
      return res.status(200).json({ message: 'No data for last 7 days' });

    const avg = {
      habitScore: 0,
      learningMins: 0,
      socialMins: 0,
      steps: 0,
      sleepHours: 0,
      stress: 0
    };

    habits.forEach(h => {
      avg.habitScore += h.habitScore;
      avg.learningMins += h.learningMins;
      avg.socialMins += h.socialMins;
      avg.steps += h.steps;
      avg.sleepHours += h.sleepHours;
      avg.stress += h.stress;
    });

    const n = habits.length;
    for (let key in avg) avg[key] = +(avg[key] / n).toFixed(1);

    res.status(200).json({ habits, weeklyAverages: avg });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
