const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Your Atlas connection
const ATLAS_URI = process.env.MONGODB_ATLAS_URI;

async function createAdmin() {
  try {
    console.log('👤 Creating admin user...');
    
    // Connect to Atlas
    await mongoose.connect(ATLAS_URI);
    console.log('✅ Connected to Atlas');
    
    // Import User model
    const User = require('./models/User');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@emporium.com' });
    if (existingAdmin) {
      console.log('ℹ️ Admin user already exists');
      await mongoose.disconnect();
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@emporium.com',
      password: hashedPassword,
      isAdmin: true,
      address: {
        street: '123 Admin Street',
        city: 'Admin City',
        state: 'AC',
        zipCode: '12345',
        country: 'USA'
      }
    });
    
    await adminUser.save();
    console.log('✅ Admin user created successfully');
    
    console.log('\n🔑 Admin Login Credentials:');
    console.log('   Email: admin@emporium.com');
    console.log('   Password: admin123');
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Failed to create admin:', error.message);
    process.exit(1);
  }
}

createAdmin();