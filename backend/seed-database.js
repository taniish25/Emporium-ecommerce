const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Product = require('./models/Product');

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with sample data...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing data');
    
    // Create sample products
    const sampleProducts = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        category: 'Electronics',
        stock: 50,
        featured: true
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health monitoring',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        category: 'Electronics',
        stock: 30,
        featured: true
      },
      {
        name: 'Coffee Mug',
        description: 'Premium ceramic coffee mug with elegant design',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=500',
        category: 'Home',
        stock: 100,
        featured: false
      },
      {
        name: 'Laptop Backpack',
        description: 'Durable laptop backpack with multiple compartments',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
        category: 'Accessories',
        stock: 25,
        featured: true
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable Bluetooth speaker with excellent sound quality',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
        category: 'Electronics',
        stock: 40,
        featured: false
      }
    ];
    
    // Insert products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${products.length} products`);
    
    // Create sample admin user
    const bcrypt = require('bcryptjs');
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
    console.log('✅ Created admin user (admin@emporium.com / admin123)');
    
    // Create sample regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const regularUser = new User({
      name: 'John Doe',
      email: 'user@emporium.com',
      password: userPassword,
      isAdmin: false,
      address: {
        street: '456 User Avenue',
        city: 'User City',
        state: 'UC',
        zipCode: '67890',
        country: 'USA'
      }
    });
    
    await regularUser.save();
    console.log('✅ Created regular user (user@emporium.com / user123)');
    
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📋 Summary:');
    console.log(`   Products: ${products.length}`);
    console.log('   Users: 2 (1 admin, 1 regular)');
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin: admin@emporium.com / admin123');
    console.log('   User: user@emporium.com / user123');
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();