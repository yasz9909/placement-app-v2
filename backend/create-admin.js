require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@placement.com',
      password: hashedPassword,
      role: 'admin',
      department: 'Administration',
      cgpa: 0,
      year: 0
    });
    
    console.log('✅ Admin user created successfully');
    console.log('Email: admin@placement.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    if (error.code === 11000) {
      console.log('Admin user already exists');
    } else {
      console.error('Error creating admin:', error.message);
    }
    process.exit(1);
  }
};

createAdmin();