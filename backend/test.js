console.log("Testing module loading...");

try {
  const mongoose = require('mongoose');
  console.log("✅ mongoose loaded");
  
  const Product = require('./models/Product');
  console.log("✅ Product model loaded");
  
  const User = require('./models/User');
  console.log("✅ User model loaded");
  
  console.log("\n✅ All modules loaded successfully!");
} catch (error) {
  console.error("❌ Error:", error.message);
  console.error("Stack:", error.stack);
}