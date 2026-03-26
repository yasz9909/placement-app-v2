require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connection successful!");
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.name);
    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();
