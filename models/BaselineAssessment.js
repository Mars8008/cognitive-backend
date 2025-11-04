const mongoose = require('mongoose');

const baselineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  educationLevel: {
    type: String,
    
    required: true
  },
  workingActivity: {
    yearsInOccupation: { type: Number, default: 0 },
    stressLevel: { type: Number, min: 0, max: 4, default: 0 },
    engagementLevel: { type: Number, min: 0, max: 2, default: 0 },
    occupationalComplexity: { type: Number, min: 0, max: 5, default: 0 },
    jobsLast5Years: { type: Number, default: 0 }
  },
  leisureActivity: {
    activities: { type: [String], default: [] },
    frequencyPerWeek: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BaselineAssessment = mongoose.model('BaselineAssessment', baselineSchema);
module.exports = BaselineAssessment;
