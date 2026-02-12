const Job = require('../models/Job');
const User = require('../models/User');

const mockJobs = [
  {
    _id: 'job1',
    company_name: 'Google',
    job_role: 'Software Engineer',
    job_description: 'Full-stack development role',
    requirements: 'Strong coding skills, problem solving',
    salary: '₹15-20 LPA',
    location: 'Bangalore',
    eligible_branches: 'CSE, IT',
    min_cgpa: 7.5,
    eligible_years: '3, 4',
    required_skills: 'Java, Python, React',
    placement_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job2',
    company_name: 'Microsoft',
    job_role: 'Cloud Engineer',
    job_description: 'Azure cloud infrastructure',
    requirements: 'Cloud computing knowledge',
    salary: '₹18-25 LPA',
    location: 'Hyderabad',
    eligible_branches: 'CSE, IT, ECE',
    min_cgpa: 8.0,
    eligible_years: '4',
    required_skills: 'Azure, DevOps, Kubernetes',
    placement_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job3',
    company_name: 'Amazon',
    job_role: 'SDE Intern',
    job_description: 'Summer internship program',
    requirements: 'Good academic record',
    salary: '₹50,000/month',
    location: 'Mumbai',
    eligible_branches: 'CSE, IT',
    min_cgpa: 7.0,
    eligible_years: '2, 3',
    required_skills: 'DSA, Java, C++',
    placement_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  }
];

exports.createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      created_by: req.user.id
    };

    const job = await Job.create(jobData);
    res.status(201).json({ message: 'Job created successfully', jobId: job._id });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    let jobs;
    try {
      jobs = await Job.find().sort({ createdAt: -1 }).populate('created_by', 'name email');
    } catch (dbError) {
      console.error('Database error, using mock jobs:', dbError.message);
      jobs = mockJobs;
    }
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('created_by', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.checkEligibility = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const student = await User.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const eligibilityResult = Job.checkEligibility(job, student);
    res.json(eligibilityResult);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
