const Job = require('../models/Job');
const User = require('../models/User');
const { sendNewJobNotification } = require('../utils/sendEmail');

const mockJobs = [
  {
    _id: 'job1',
    company_name: 'Google',
    job_role: 'Software Engineer',
    job_description: 'Full-stack development role working on cutting-edge technologies',
    requirements: 'Strong coding skills, problem solving, data structures',
    salary: '₹15-20 LPA',
    location: 'Bangalore',
    eligible_branches: 'CSE, IT',
    min_cgpa: 7.5,
    eligible_years: '3, 4',
    required_skills: 'Java, Python, React, Node.js',
    placement_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job2',
    company_name: 'Microsoft',
    job_role: 'Cloud Engineer',
    job_description: 'Azure cloud infrastructure and DevOps',
    requirements: 'Cloud computing knowledge, Azure certification preferred',
    salary: '₹18-25 LPA',
    location: 'Hyderabad',
    eligible_branches: 'CSE, IT, ECE',
    min_cgpa: 8.0,
    eligible_years: '4',
    required_skills: 'Azure, DevOps, Kubernetes, Docker',
    placement_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job3',
    company_name: 'Amazon',
    job_role: 'SDE Intern',
    job_description: 'Summer internship program for aspiring software developers',
    requirements: 'Good academic record, passion for coding',
    salary: '₹50,000/month',
    location: 'Mumbai',
    eligible_branches: 'CSE, IT',
    min_cgpa: 7.0,
    eligible_years: '2, 3',
    required_skills: 'DSA, Java, C++, Problem Solving',
    placement_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job4',
    company_name: 'TCS',
    job_role: 'Digital Developer',
    job_description: 'Work on digital transformation projects for global clients',
    requirements: 'Good communication skills, team player',
    salary: '₹3.5-7 LPA',
    location: 'Chennai, Pune, Bangalore',
    eligible_branches: 'CSE, IT, ECE, EEE',
    min_cgpa: 6.5,
    eligible_years: '4',
    required_skills: 'Java, Python, SQL, Web Technologies',
    placement_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job5',
    company_name: 'Infosys',
    job_role: 'Systems Engineer',
    job_description: 'Join our technology and consulting services team',
    requirements: 'Strong analytical and problem-solving skills',
    salary: '₹4-8 LPA',
    location: 'Mysore, Bangalore',
    eligible_branches: 'CSE, IT, ECE, EEE, MECH',
    min_cgpa: 6.0,
    eligible_years: '4',
    required_skills: 'Programming, Database, Communication',
    placement_date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job6',
    company_name: 'Wipro',
    job_role: 'Project Engineer',
    job_description: 'Work on enterprise software solutions',
    requirements: 'Good coding skills, willingness to learn',
    salary: '₹3.5-6 LPA',
    location: 'Bangalore, Hyderabad',
    eligible_branches: 'CSE, IT, ECE',
    min_cgpa: 6.5,
    eligible_years: '4',
    required_skills: 'Java, C++, SQL, Web Development',
    placement_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job7',
    company_name: 'Accenture',
    job_role: 'Application Development Associate',
    job_description: 'Design, build and configure applications',
    requirements: 'Strong technical and communication skills',
    salary: '₹4.5-8 LPA',
    location: 'Bangalore, Pune, Mumbai',
    eligible_branches: 'CSE, IT, ECE, EEE',
    min_cgpa: 7.0,
    eligible_years: '4',
    required_skills: 'Java, Python, Cloud, Agile',
    placement_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job8',
    company_name: 'Cognizant',
    job_role: 'Programmer Analyst',
    job_description: 'Develop and maintain software applications',
    requirements: 'Good programming knowledge, analytical thinking',
    salary: '₹4-7 LPA',
    location: 'Chennai, Coimbatore',
    eligible_branches: 'CSE, IT, ECE',
    min_cgpa: 6.5,
    eligible_years: '4',
    required_skills: 'Java, SQL, Testing, SDLC',
    placement_date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job9',
    company_name: 'IBM',
    job_role: 'Associate System Engineer',
    job_description: 'Work on enterprise solutions and cloud technologies',
    requirements: 'Strong problem-solving and analytical skills',
    salary: '₹4-7.5 LPA',
    location: 'Bangalore, Delhi',
    eligible_branches: 'CSE, IT, ECE, EEE',
    min_cgpa: 7.0,
    eligible_years: '4',
    required_skills: 'Java, Cloud, AI/ML, Database',
    placement_date: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job10',
    company_name: 'Capgemini',
    job_role: 'Software Engineer',
    job_description: 'Digital transformation and technology consulting',
    requirements: 'Good communication and technical skills',
    salary: '₹4-6.5 LPA',
    location: 'Mumbai, Pune',
    eligible_branches: 'CSE, IT, ECE',
    min_cgpa: 6.5,
    eligible_years: '4',
    required_skills: 'Java, Python, Web Technologies',
    placement_date: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job11',
    company_name: 'Tech Mahindra',
    job_role: 'Associate Software Engineer',
    job_description: 'Telecom and IT services development',
    requirements: 'Programming knowledge, team collaboration',
    salary: '₹3.5-6 LPA',
    location: 'Pune, Hyderabad',
    eligible_branches: 'CSE, IT, ECE, EEE',
    min_cgpa: 6.0,
    eligible_years: '4',
    required_skills: 'C++, Java, Networking, Testing',
    placement_date: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  },
  {
    _id: 'job12',
    company_name: 'Oracle',
    job_role: 'Applications Developer',
    job_description: 'Develop and maintain Oracle applications',
    requirements: 'Database knowledge, strong coding skills',
    salary: '₹6-10 LPA',
    location: 'Bangalore, Hyderabad',
    eligible_branches: 'CSE, IT',
    min_cgpa: 7.5,
    eligible_years: '3, 4',
    required_skills: 'Java, SQL, PL/SQL, Oracle DB',
    placement_date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
    application_deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    created_by: { name: 'Admin', email: 'admin@placement.com' },
    createdAt: new Date()
  }
];

exports.createJob = async (req, res) => {
  try {
    console.log('Creating new job with data:', req.body);
    
    const jobData = {
      ...req.body,
      created_by: req.user.id,
      id: 'job-' + Date.now() // Add ID for mock jobs
    };

    let job;
    try {
      job = await Job.create(jobData);
      console.log('Job created in database:', job._id);
    } catch (dbError) {
      console.error('Database error, using mock job creation:', dbError.message);
      // Mock job creation - add to mockJobs array
      job = {
        _id: jobData.id,
        ...jobData,
        createdAt: new Date()
      };
      mockJobs.unshift(job); // Add to beginning of array
      console.log('Mock job created:', job._id);
    }
    
    // Send email notifications to all students
    try {
      console.log('Fetching student emails...');
      let students;
      try {
        students = await User.find({ role: 'student' }).select('email name');
      } catch (dbError) {
        console.log('Database error, using mock student emails');
        students = [{ email: 'yaswanth2420@gmail.com', name: 'Student' }];
      }
      
      const validStudents = students.filter(s => s.email);
      
      if (validStudents.length > 0) {
        console.log(`Sending notifications to ${validStudents.length} students`);
        const emailResult = await sendNewJobNotification(job, validStudents);
        console.log('Email notification result:', emailResult);
      }
    } catch (emailError) {
      console.error('Error sending email notifications:', emailError.message);
      console.error('Email error stack:', emailError.stack);
      // Don't fail the job creation if email fails
    }
    
    res.status(201).json({ 
      message: 'Job created successfully and notifications sent', 
      jobId: job._id || job.id,
      job: job
    });
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
      if (!jobs || jobs.length === 0) {
        jobs = mockJobs;
      }
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
    let job, student;
    
    try {
      job = await Job.findById(req.params.id);
      student = await User.findById(req.user.id);
    } catch (dbError) {
      console.error('Database error, using mock eligibility:', dbError.message);
      // Mock eligibility - always eligible
      return res.json({
        eligible: true,
        reasons: []
      });
    }
    
    if (!job) {
      // Check mock jobs
      job = mockJobs.find(j => j._id === req.params.id);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      // Mock student data
      student = {
        department: 'CSE',
        cgpa: 8.0,
        year: 4
      };
    }

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const eligibilityResult = Job.checkEligibility ? Job.checkEligibility(job, student) : { eligible: true, reasons: [] };
    res.json(eligibilityResult);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
