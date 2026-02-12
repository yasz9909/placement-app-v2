require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    
    // Test database operations
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection working' });
    console.log('✅ Database write test successful');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

connectDB();