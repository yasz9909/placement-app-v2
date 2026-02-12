const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true
  },
  job_role: {
    type: String,
    required: true
  },
  job_description: {
    type: String,
    required: true
  },
  requirements: String,
  salary: String,
  location: String,
  eligible_branches: String,
  min_cgpa: Number,
  eligible_years: String,
  required_skills: String,
  placement_date: {
    type: Date,
    required: true
  },
  application_deadline: {
    type: Date,
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

jobSchema.statics.checkEligibility = function(job, student) {
  const reasons = [];
  
  if (job.min_cgpa && student.cgpa < job.min_cgpa) {
    reasons.push(`Minimum CGPA required: ${job.min_cgpa}`);
  }
  
  if (job.eligible_branches) {
    const branches = job.eligible_branches.split(',').map(b => b.trim().toLowerCase());
    if (!branches.includes(student.department.toLowerCase())) {
      reasons.push(`Eligible branches: ${job.eligible_branches}`);
    }
  }
  
  if (job.eligible_years) {
    const years = job.eligible_years.split(',').map(y => parseInt(y.trim()));
    if (!years.includes(student.year)) {
      reasons.push(`Eligible years: ${job.eligible_years}`);
    }
  }
  
  return {
    eligible: reasons.length === 0,
    reasons: reasons
  };
};

module.exports = mongoose.model('Job', jobSchema);
