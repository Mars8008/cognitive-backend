
const mongoose = require('mongoose');

const dailyHabitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

 
  date: { type: Date, required: true },
  learningMins:   { type: Number, min: 0, default: 0 },   // минут
  socialMins:     { type: Number, min: 0, default: 0 },   // минут
  steps:          { type: Number, min: 0, default: 0 },   // алхам
  sleepHours:     { type: Number, min: 0, max: 24, default: 0 }, // цаг
  stress:         { type: Number, min: 0, max: 5, default: 0 },  // 0–5

  habitScore:     { type: Number, min: 0, max: 100, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

dailyHabitSchema.index({ userId: 1, date: 1 }, { unique: true });

function computeHabitScore(doc) {
  const clamp01 = v => Math.max(0, Math.min(1, v));

  const learn = clamp01(doc.learningMins / 60);     // 60 мин = 100%
  const social = clamp01(doc.socialMins / 60);      // 60 мин = 100%
  const step = clamp01(doc.steps / 10000);          // 10,000 алхам = 100%
  const sleep = clamp01(doc.sleepHours / 8);        // 8 цаг = 100%
  const stressInv = clamp01(1 - (doc.stress / 5));  // 0 стресст 100%

  const score01 =
    0.25 * learn +
    0.15 * social +
    0.25 * step +
    0.25 * sleep +
    0.10 * stressInv;

  return Math.round(score01 * 100);
}

dailyHabitSchema.pre('save', function (next) {
  if (this.isModified('habitScore') && this.habitScore !== undefined) return next();
  this.habitScore = computeHabitScore(this);
  next();
});

const DailyHabit = mongoose.model('DailyHabit', dailyHabitSchema);
module.exports = DailyHabit;
