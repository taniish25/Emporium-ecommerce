const mongoose = require('mongoose');
require('dotenv').config();

// Your Atlas connection
const ATLAS_URI = process.env.MONGODB_ATLAS_URI;

// Product data from your JSON
const products = [
  {
    name: "iPhone 15 Pro Max",
    description: "Latest iPhone with A17 Pro chip, titanium design, 48MP camera",
    price: 1999,
    category: "Electronics",
    image: "https://images.macrumors.com/t/oiWkxB5isnYn8BFbcgKsnDIUOdI=/800x0/smart/article-new/2023/09/iPhone-15-Pro-Lineup-Feature.jpg?lossy",
    stock: 50
  },
  {
    name: "MacBook Air M2",
    description: "Super fast laptop with Apple M2 chip, 13.6\" display",
    price: 1199,
    category: "Electronics",
    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mba13-skyblue-select-202503?wid=904&hei=840&fmt=jpeg&qlt=90&.v=M2RyY09CWXlTQUp1KzEveHR6VXNxcTQ1bzN1SitYTU83Mm9wbk1xa1lWNC9UNzNvY2N5NXJTTDQ2YkVYYmVXakJkRlpCNVhYU3AwTldRQldlSnpRa0lIV0Fmdk9rUlVsZ3hnNXZ3K3lEVlk",
    stock: 30
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with air cushion technology",
    price: 150,
    category: "Fashion",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT7oNZH4isH3NfkNT9KEjS0FcXU9B6QMVFXg&s",
    stock: 200
  },
  {
    name: "Coffee Maker",
    description: "Automatic espresso machine with milk frother",
    price: 199,
    category: "Home",
    image: "https://www.suranasons.in/cdn/shop/files/61x2BKrHBKL._SL1000.jpg?v=1736500986",
    stock: 60
  },
  {
    name: "Apple Watch Series 9",
    description: "Always-On Retina display, GPS + Cellular",
    price: 429,
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHkzz0ooE7b_sc2a7z8Jc6wUUACiRBSkav6Q&s",
    stock: 150
  },
  {
    name: "DJI Mini 3 Pro Drone",
    description: "4K/60fps video, 48MP photos, 34-min flight time",
    price: 759,
    category: "Electronics",
    image: "https://everse.in/_next/image?url=https%3A%2F%2Fapi.everse.in%2Fstorage%2F72e455a735e8e360664b2e5b92086639%2FMini%203%20Pro%20Standard.jpg&w=1920&q=75",
    stock: 30
  },
  {
    name: "Sonos Beam Soundbar",
    description: "Compact smart soundbar with Dolby Atmos",
    price: 449,
    category: "Electronics",
    image: "https://media.sonos.com/images/znqtjj88/production/c79156fe93547d1b0a993dc1fb7b381d8773737a-3000x1834.png?q=75&fit=clip&auto=format",
    stock: 65
  },
  {
    name: "Vans Old Skool",
    description: "A pair of round-toe black sneakers, has lace-up detail. Leather and canvas upper. Cushioned footbed. Textured and patterned outsole",
    price: 200,
    category: "Fashion",
    image: "https://www.iconsofsurf.com/cdn/shop/files/oldskoolblack_1.jpg?v=1692974211",
    stock: 200
  },
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight fit, 100% cotton denim",
    price: 89,
    category: "Fashion",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzVQmm52lGKTuHtHbXNXdDPbkoO_K8UPcVA&s",
    stock: 300
  },
  {
    name: "Nike Tech Fleece Hoodie",
    description: "Lightweight, warm fleece with zip pockets",
    price: 120,
    category: "Fashion",
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/3c86702a-1f2b-424d-8876-b353f4b50833/AS+M+NK+TCH+FLC+HOODIE.png",
    stock: 180
  }
];

async function importProducts() {
  try {
    console.log('📦 Importing products to Atlas...');
    
    // Connect to Atlas
    await mongoose.connect(ATLAS_URI);
    console.log('✅ Connected to Atlas');
    
    // Import Product model
    const Product = require('./models/Product');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');
    
    // Insert new products
    const insertedProducts = await Product.insertMany(products);
    console.log(`✅ Imported ${insertedProducts.length} products`);
    
    console.log('\n🎉 Products imported successfully!');
    console.log('\n📋 Imported Products:');
    insertedProducts.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - $${product.price}`);
    });
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

importProducts();