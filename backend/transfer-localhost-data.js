const mongoose = require('mongoose');
require('dotenv').config();

// Connection URIs
const LOCAL_URI = 'mongodb://localhost:27017/emporium';
const ATLAS_URI = process.env.MONGODB_ATLAS_URI;

async function transferLocalhostData() {
  try {
    console.log('🔄 Transferring data from localhost to Atlas...');
    
    // Connect to localhost
    console.log('📡 Connecting to localhost MongoDB...');
    const localConnection = await mongoose.createConnection(LOCAL_URI);
    console.log('✅ Connected to localhost');
    
    // Connect to Atlas
    console.log('☁️ Connecting to Atlas...');
    const atlasConnection = await mongoose.createConnection(ATLAS_URI);
    console.log('✅ Connected to Atlas');
    
    // Get all collections from localhost
    const collections = await localConnection.db.listCollections().toArray();
    console.log(`📊 Found ${collections.length} collections in localhost`);
    
    // Clear Atlas database first
    console.log('🗑️ Clearing Atlas database...');
    const atlasCollections = await atlasConnection.db.listCollections().toArray();
    for (const col of atlasCollections) {
      await atlasConnection.db.collection(col.name).deleteMany({});
      console.log(`   Cleared ${col.name}`);
    }
    
    // Transfer each collection
    for (const collection of collections) {
      const collectionName = collection.name;
      console.log(`\n📦 Transferring ${collectionName}...`);
      
      // Get all documents from localhost
      const documents = await localConnection.db.collection(collectionName).find({}).toArray();
      
      if (documents.length > 0) {
        // Insert into Atlas
        await atlasConnection.db.collection(collectionName).insertMany(documents);
        console.log(`✅ Transferred ${documents.length} documents to ${collectionName}`);
      } else {
        console.log(`ℹ️ No documents found in ${collectionName}`);
      }
    }
    
    console.log('\n🎉 Data transfer completed successfully!');
    
    // Verify transfer
    console.log('\n📊 Verification:');
    for (const collection of collections) {
      const localCount = await localConnection.db.collection(collection.name).countDocuments();
      const atlasCount = await atlasConnection.db.collection(collection.name).countDocuments();
      console.log(`   ${collection.name}: localhost(${localCount}) → atlas(${atlasCount})`);
    }
    
    // Close connections
    await localConnection.close();
    await atlasConnection.close();
    
    console.log('\n✅ All data successfully transferred from localhost to Atlas!');
    
  } catch (error) {
    console.error('❌ Transfer failed:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Make sure MongoDB is running locally:');
      console.log('   - Start MongoDB service');
      console.log('   - Or run: mongod');
    }
    
    process.exit(1);
  }
}

transferLocalhostData();