const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  cgpa: {
    type: Number,
    required: true
  },
  resume_url: {
    type: String,
    required: true
  },
  additional_info: String,
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'rejected', 'selected'],
    default: 'pending'
  },
  applied_at: {
    type: Date,
    default: Date.now
  }
});

applicationSchema.index({ job_id: 1, student_id: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
