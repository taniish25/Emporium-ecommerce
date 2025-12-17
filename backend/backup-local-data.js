const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Local MongoDB connection (correct database name)
const LOCAL_URI = 'mongodb://localhost:27017/mern-ecommerce';

// Import your models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

async function backupData() {
  try {
    console.log('💾 Starting local data backup...');
    
    // Connect to local MongoDB
    await mongoose.connect(LOCAL_URI);
    console.log('✅ Connected to local MongoDB');
    
    // Create backup directory
    const backupDir = path.join(__dirname, 'backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }
    
    // Backup Users
    console.log('👥 Backing up users...');
    const users = await User.find({}).lean();
    fs.writeFileSync(
      path.join(backupDir, 'users.json'), 
      JSON.stringify(users, null, 2)
    );
    console.log(`✅ Backed up ${users.length} users`);
    
    // Backup Products
    console.log('🛍️ Backing up products...');
    const products = await Product.find({}).lean();
    fs.writeFileSync(
      path.join(backupDir, 'products.json'), 
      JSON.stringify(products, null, 2)
    );
    console.log(`✅ Backed up ${products.length} products`);
    
    // Backup Orders
    console.log('📦 Backing up orders...');
    const orders = await Order.find({}).lean();
    fs.writeFileSync(
      path.join(backupDir, 'orders.json'), 
      JSON.stringify(orders, null, 2)
    );
    console.log(`✅ Backed up ${orders.length} orders`);
    
    console.log('🎉 Backup completed successfully!');
    console.log(`📁 Backup saved to: ${backupDir}`);
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    process.exit(1);
  }
}

// Run backup
backupData();