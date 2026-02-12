const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  placement_date: {
    type: Date,
    required: true
  },
  timing: {
    type: String,
    required: true
  },
  venue_details: {
    type: String,
    required: true
  },
  additional_notes: String,
  reminder_sent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Placement', placementSchema);
