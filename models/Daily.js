
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 


const dailySchema = new mongoose.Schema({
   customId: { 
    type: String, 
    unique: true, 
    default: uuidv4 // UUID-ийг автоматикаар үүсгэх
  },
  learningMins: {
    type: Number,
    required: true
  },
  socialMins: {
    type: Number,
    required: true,
    
  },
  steps: {
    type: Number,
    required: true
  },
   sleepHrs: {
    type: Number,
    required: true
  },
    stress: {
    type: Number,
    required: true
  },
});

const Daily = mongoose.model('Daily', dailySchema);
module.exports = Daily;
