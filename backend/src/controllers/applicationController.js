const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const EmailService = require('../services/emailService');

exports.applyForJob = async (req, res) => {
  try {
    const { job_id, full_name, email, phone, department, cgpa, additional_info } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume PDF is required' });
    }

    const existingApp = await Application.findOne({ job_id, student_id: req.user.id });
    if (existingApp) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const job = await Job.findById(job_id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const student = await User.findById(req.user.id);
    const eligibility = Job.checkEligibility(job, student);
    
    if (!eligibility.eligible) {
      return res.status(403).json({ 
        message: 'You are not eligible for this job',
        reasons: eligibility.reasons
      });
    }

    const application = await Application.create({
      job_id,
      student_id: req.user.id,
      full_name,
      email,
      phone,
      department,
      cgpa,
      resume_url: req.file.path,
      additional_info
    });

    await EmailService.sendApplicationConfirmation(
      { name: full_name, email },
      job
    );

    res.status(201).json({ 
      message: 'Application submitted successfully',
      applicationId: application._id
    });
  } catch (error) {
    console.error('Apply job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student_id: req.user.id })
      .populate('job_id')
      .sort({ applied_at: -1 });
    
    const formatted = applications.map(app => ({
      ...app.toObject(),
      company_name: app.job_id?.company_name,
      job_role: app.job_id?.job_role,
      placement_date: app.job_id?.placement_date
    }));
    
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getJobApplications = async (req, res) => {
  try {
    const applications = await Application.find({ job_id: req.params.jobId })
      .populate('student_id', 'name email');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json({ message: 'Application status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
