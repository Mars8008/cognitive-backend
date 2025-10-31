// controllers/baselineController.js
const BaselineAssessment = require('../models/BaselineAssessment');

// Create new baseline
exports.createBaseline = async (req, res) => {
  try {
    const baseline = new BaselineAssessment({
      userId: req.body.userId,
      educationLevel: req.body.educationLevel,
      workingActivity: req.body.workingActivity,
      leisureActivity: req.body.leisureActivity
    });

    const saved = await baseline.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all baselines
exports.getAllBaselines = async (req, res) => {
  try {
    const baselines = await BaselineAssessment.find().populate('userId', 'name email');
    res.status(200).json(baselines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get baseline by ID
exports.getBaselineById = async (req, res) => {
  try {
    const baseline = await BaselineAssessment.findById(req.params.id).populate('userId', 'name email');
    if (!baseline) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(baseline);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update baseline
exports.updateBaseline = async (req, res) => {
  try {
    const updated = await BaselineAssessment.findByIdAndUpdate(
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

// Delete baseline
exports.deleteBaseline = async (req, res) => {
  try {
    const deleted = await BaselineAssessment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
