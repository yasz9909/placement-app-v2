require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const seedAdmin = async () => {
  await connectDB();
  
  try {
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@placement.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit(0);
    }
    
    // Create admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await User.create({
      name: 'Admin User',
      email: 'admin@placement.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@placement.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

seedAdmin();
