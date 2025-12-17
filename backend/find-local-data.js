const mongoose = require('mongoose');

async function findLocalData() {
  try {
    console.log('🔍 Searching for data in localhost MongoDB...');
    
    // Try different common database names
    const possibleDatabases = [
      'emporium',
      'mern-ecommerce', 
      'ecommerce',
      'test',
      'admin'
    ];
    
    for (const dbName of possibleDatabases) {
      try {
        console.log(`\n📊 Checking database: ${dbName}`);
        const uri = `mongodb://localhost:27017/${dbName}`;
        const connection = await mongoose.createConnection(uri);
        
        // List collections
        const collections = await connection.db.listCollections().toArray();
        console.log(`   Collections: ${collections.map(c => c.name).join(', ') || 'none'}`);
        
        // Check document counts
        for (const col of collections) {
          const count = await connection.db.collection(col.name).countDocuments();
          if (count > 0) {
            console.log(`   ✅ ${col.name}: ${count} documents`);
            
            // Show sample document
            const sample = await connection.db.collection(col.name).findOne();
            console.log(`      Sample: ${JSON.stringify(sample, null, 2).substring(0, 150)}...`);
          }
        }
        
        await connection.close();
        
      } catch (error) {
        console.log(`   ❌ Cannot connect to ${dbName}: ${error.message}`);
      }
    }
    
    // Also try to list all databases
    try {
      console.log('\n🗄️ Listing all databases...');
      const adminConnection = await mongoose.createConnection('mongodb://localhost:27017/admin');
      const adminDb = adminConnection.db.admin();
      const databases = await adminDb.listDatabases();
      
      console.log('Available databases:');
      databases.databases.forEach(db => {
        console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
      });
      
      await adminConnection.close();
      
    } catch (error) {
      console.log('❌ Cannot list databases:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Make sure MongoDB is running locally:');
    console.log('   - Windows: Start MongoDB service');
    console.log('   - Or run: mongod');
  }
}

findLocalData();