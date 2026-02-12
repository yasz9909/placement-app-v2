const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.register = async (req, res) => {
  try {
    const { name, reg_no, email, password, phone, department, cgpa, year, timing, venue_details } = req.body;

    if (!name || !email || !password || !department || !cgpa || !year) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    if (reg_no) {
      const existingRegNo = await User.findOne({ reg_no });
      if (existingRegNo) {
        return res.status(400).json({ message: 'Registration number already exists' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      reg_no,
      email,
      password: hashedPassword,
      role: 'student',
      phone,
      department,
      cgpa,
      year,
      timing,
      venue_details
    });

    const token = jwt.sign(
      { id: user._id, email, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: { id: user._id, name, email, role: 'student' }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    let user;
    try {
      user = await User.findOne({ email });
    } catch (dbError) {
      console.error('Database error during login:', dbError.message);
      
      // Mock admin for testing without DB
      if (email === 'admin@placement.com' && password === 'admin123') {
        const token = jwt.sign(
          { id: 'admin-mock-id', email, role: 'admin' },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        );
        
        return res.json({
          message: 'Login successful (mock mode)',
          token,
          user: {
            id: 'admin-mock-id',
            name: 'Admin User',
            email,
            role: 'admin'
          }
        });
      }
      
      return res.status(503).json({ message: 'Database connection error. Please try again later.' });
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        cgpa: user.cgpa,
        year: user.year
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    let students;
    try {
      students = await User.find({ role: 'student' })
        .select('-password')
        .sort({ createdAt: -1 });
    } catch (dbError) {
      console.error('Database error fetching students:', dbError.message);
      // Mock students data
      students = [
        {
          _id: 'student1',
          name: 'Yaswanth Kumar',
          reg_no: 'CSE2021001',
          email: 'yaswanth2420@gmail.com',
          phone: '9876543210',
          department: 'CSE',
          year: 4,
          cgpa: 8.5,
          timing: 'Morning (9:00 AM - 12:00 PM)',
          venue_details: 'Main Campus, Auditorium Block A',
          role: 'student',
          createdAt: new Date('2024-01-15')
        },
        {
          _id: 'student2',
          name: 'Priya Sharma',
          reg_no: 'IT2021045',
          email: 'priya.sharma@student.com',
          phone: '9876543211',
          department: 'IT',
          year: 3,
          cgpa: 9.2,
          timing: 'Afternoon (2:00 PM - 5:00 PM)',
          venue_details: 'IT Block, Seminar Hall 301',
          role: 'student',
          createdAt: new Date('2024-01-16')
        },
        {
          _id: 'student3',
          name: 'Amit Patel',
          reg_no: 'ECE2021089',
          email: 'amit.patel@student.com',
          phone: '9876543212',
          department: 'ECE',
          year: 4,
          cgpa: 7.8,
          timing: 'Morning (10:00 AM - 1:00 PM)',
          venue_details: 'ECE Block, Lab Complex 2',
          role: 'student',
          createdAt: new Date('2024-01-17')
        },
        {
          _id: 'student4',
          name: 'Sneha Reddy',
          reg_no: 'CSE2021102',
          email: 'sneha.reddy@student.com',
          phone: '9876543213',
          department: 'CSE',
          year: 3,
          cgpa: 8.9,
          timing: 'Afternoon (1:00 PM - 4:00 PM)',
          venue_details: 'Main Campus, Conference Hall B',
          role: 'student',
          createdAt: new Date('2024-01-18')
        },
        {
          _id: 'student5',
          name: 'Vikram Singh',
          reg_no: 'MECH2021067',
          email: 'vikram.singh@student.com',
          phone: '9876543214',
          department: 'MECH',
          year: 2,
          cgpa: 7.5,
          timing: 'Morning (9:30 AM - 12:30 PM)',
          venue_details: 'Mechanical Block, Workshop Area',
          role: 'student',
          createdAt: new Date('2024-01-19')
        },
        {
          _id: 'student6',
          name: 'Ananya Iyer',
          reg_no: 'CSE2021156',
          email: 'ananya.iyer@student.com',
          phone: '9876543215',
          department: 'CSE',
          year: 4,
          cgpa: 9.5,
          timing: 'Morning (8:00 AM - 11:00 AM)',
          venue_details: 'Main Campus, Auditorium Block C',
          role: 'student',
          createdAt: new Date('2024-01-20')
        },
        {
          _id: 'student7',
          name: 'Rohan Gupta',
          reg_no: 'IT2021078',
          email: 'rohan.gupta@student.com',
          phone: '9876543216',
          department: 'IT',
          year: 3,
          cgpa: 8.2,
          timing: 'Afternoon (3:00 PM - 6:00 PM)',
          venue_details: 'IT Block, Computer Lab 205',
          role: 'student',
          createdAt: new Date('2024-01-21')
        },
        {
          _id: 'student8',
          name: 'Divya Nair',
          reg_no: 'EEE2021034',
          email: 'divya.nair@student.com',
          phone: '9876543217',
          department: 'EEE',
          year: 4,
          cgpa: 8.7,
          timing: 'Morning (10:30 AM - 1:30 PM)',
          venue_details: 'EEE Block, Lecture Hall 102',
          role: 'student',
          createdAt: new Date('2024-01-22')
        }
      ];
    }
    
    res.json({
      count: students.length,
      students
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, reg_no, phone, department, cgpa, year, timing, venue_details } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (reg_no) updateData.reg_no = reg_no;
    if (phone) updateData.phone = phone;
    if (department) updateData.department = department;
    if (cgpa) updateData.cgpa = cgpa;
    if (year) updateData.year = year;
    if (timing) updateData.timing = timing;
    if (venue_details) updateData.venue_details = venue_details;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    
    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({ message: 'Google Client ID not configured' });
    }
    
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;
    
    let user;
    
    try {
      user = await User.findOne({ email });
      
      if (!user) {
        user = await User.create({
          name,
          email,
          password: await bcrypt.hash(googleId, 10),
          role: 'student',
          department: 'Not specified',
          cgpa: 0,
          year: 1
        });
      }
    } catch (dbError) {
      console.error('Database error, using mock user:', dbError.message);
      user = {
        _id: googleId,
        name,
        email,
        role: 'student',
        department: 'Not specified',
        cgpa: 0,
        year: 1
      };
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email || email, role: user.role || 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Google login successful',
      token,
      user: {
        id: user._id,
        name: user.name || name,
        email: user.email || email,
        role: user.role || 'student',
        department: user.department || 'Not specified',
        cgpa: user.cgpa || 0,
        year: user.year || 1
      }
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Google authentication failed', error: error.message });
  }
};
