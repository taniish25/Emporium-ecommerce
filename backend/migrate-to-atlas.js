const mongoose = require('mongoose');
require('dotenv').config();

// Your local MongoDB connection (correct database name)
const LOCAL_URI = 'mongodb://localhost:27017/mern-ecommerce';

// Your Atlas connection
const ATLAS_URI = process.env.MONGODB_ATLAS_URI || 'mongodb+srv://emporium-user:taniish25@emporium.kzvu9dg.mongodb.net/emporium';

// Import your models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

async function migrateData() {
  try {
    console.log('🚀 Starting data migration...');
    
    // Connect to local MongoDB
    console.log('📡 Connecting to local MongoDB...');
    const localConnection = await mongoose.createConnection(LOCAL_URI);
    console.log('✅ Connected to local MongoDB');
    
    // Get models from local connection
    const LocalUser = localConnection.model('User', User.schema);
    const LocalProduct = localConnection.model('Product', Product.schema);
    const LocalOrder = localConnection.model('Order', Order.schema);
    
    // Connect to Atlas
    console.log('☁️ Connecting to MongoDB Atlas...');
    const atlasConnection = await mongoose.createConnection(ATLAS_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Get models from Atlas connection
    const AtlasUser = atlasConnection.model('User', User.schema);
    const AtlasProduct = atlasConnection.model('Product', Product.schema);
    const AtlasOrder = atlasConnection.model('Order', Order.schema);
    
    // Migrate Users
    console.log('👥 Migrating users...');
    const users = await LocalUser.find({});
    if (users.length > 0) {
      await AtlasUser.insertMany(users);
      console.log(`✅ Migrated ${users.length} users`);
    } else {
      console.log('ℹ️ No users found to migrate');
    }
    
    // Migrate Products
    console.log('🛍️ Migrating products...');
    const products = await LocalProduct.find({});
    if (products.length > 0) {
      await AtlasProduct.insertMany(products);
      console.log(`✅ Migrated ${products.length} products`);
    } else {
      console.log('ℹ️ No products found to migrate');
    }
    
    // Migrate Orders
    console.log('📦 Migrating orders...');
    const orders = await LocalOrder.find({});
    if (orders.length > 0) {
      await AtlasOrder.insertMany(orders);
      console.log(`✅ Migrated ${orders.length} orders`);
    } else {
      console.log('ℹ️ No orders found to migrate');
    }
    
    console.log('🎉 Migration completed successfully!');
    
    // Close connections
    await localConnection.close();
    await atlasConnection.close();
    
    console.log('📊 Migration Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Products: ${products.length}`);
    console.log(`   Orders: ${orders.length}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
migrateData();