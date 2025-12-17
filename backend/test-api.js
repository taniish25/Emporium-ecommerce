const mongoose = require('mongoose');
require('dotenv').config();

async function testAPI() {
  try {
    console.log('🔍 Testing API endpoints...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
    
    // Import models
    const Product = require('./models/Product');
    const User = require('./models/User');
    
    // Check products
    const productCount = await Product.countDocuments();
    console.log(`📦 Products in database: ${productCount}`);
    
    if (productCount > 0) {
      const sampleProduct = await Product.findOne();
      console.log(`📋 Sample product: ${sampleProduct.name} - $${sampleProduct.price}`);
    }
    
    // Check users
    const userCount = await User.countDocuments();
    console.log(`👥 Users in database: ${userCount}`);
    
    if (userCount > 0) {
      const adminUser = await User.findOne({ isAdmin: true });
      console.log(`🔑 Admin user: ${adminUser ? adminUser.email : 'Not found'}`);
    }
    
    await mongoose.disconnect();
    console.log('✅ Database test completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();