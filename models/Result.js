const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 


const resultSchema = new mongoose.Schema({
   customId: { 
    type: String, 
    unique: true, 
    default: uuidv4 // UUID-ийг автоматикаар үүсгэх
  },
  score: {
    type: String,
    required: true
  },
  Newtitle: {
    type: String,
    required: true,
    
  },
  text: {
    type: String,
    required: true
  },
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
