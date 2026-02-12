const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  reg_no: {
    type: String,
    sparse: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  phone: String,
  department: String,
  cgpa: Number,
  year: Number,
  timing: String,
  venue_details: String,
  resume_url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
