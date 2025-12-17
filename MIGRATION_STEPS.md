# 🚀 Quick Migration Steps for Your Emporium App

## Your Atlas Connection Details:
- **Cluster**: `emporium.kzvu9dg.mongodb.net`
- **Username**: `emporium-user`
- **Password**: `taniish25`
- **Database**: `emporium`

## Step 1: Update Environment Variables

Copy your `.env.migration` file to `.env` in the backend directory:

```bash
cd backend
copy .env.migration .env
```

Or manually create `.env` with:
```env
MONGODB_URI=mongodb://localhost:27017/emporium
MONGODB_ATLAS_URI=mongodb+srv://emporium-user:taniish25@emporium.kzvu9dg.mongodb.net/emporium
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

## Step 2: Backup Your Local Data (Safety First!)

```bash
cd backend
node backup-local-data.js
```

This creates a `backup` folder with your data as JSON files.

## Step 3: Run Migration to Atlas

```bash
node migrate-to-atlas.js
```

You should see output like:
```
🚀 Starting data migration...
📡 Connecting to local MongoDB...
✅ Connected to local MongoDB
☁️ Connecting to MongoDB Atlas...
✅ Connected to MongoDB Atlas
👥 Migrating users...
✅ Migrated X users
🛍️ Migrating products...
✅ Migrated X products
📦 Migrating orders...
✅ Migrated X orders
🎉 Migration completed successfully!
```

## Step 4: Verify Migration

1. **Check Atlas Dashboard**:
   - Go to https://cloud.mongodb.com/
   - Navigate to your cluster
   - Click "Browse Collections"
   - You should see: `users`, `products`, `orders` collections

2. **Test Connection Locally**:
   ```bash
   # Update your .env file
   MONGODB_URI=mongodb+srv://emporium-user:taniish25@emporium.kzvu9dg.mongodb.net/emporium
   
   # Start your backend
   npm run dev
   
   # Test in browser: http://localhost:5000/api/health
   ```

## Step 5: Deploy to Render

Now you're ready to deploy! Use this connection string in Render:

**Environment Variable for Render:**
```
MONGODB_URI=mongodb+srv://emporium-user:taniish25@emporium.kzvu9dg.mongodb.net/emporium
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
```

## 🔧 Quick Commands Summary:

```bash
# 1. Navigate to backend
cd backend

# 2. Backup local data
node backup-local-data.js

# 3. Migrate to Atlas
node migrate-to-atlas.js

# 4. Test with Atlas
npm run dev
```

## ⚠️ Troubleshooting:

**If migration fails:**
1. Check if MongoDB is running locally: `mongod --version`
2. Verify Atlas network access allows all IPs (0.0.0.0/0)
3. Test Atlas connection: `ping emporium.kzvu9dg.mongodb.net`

**If connection fails:**
- Username: `emporium-user`
- Password: `taniish25`
- Make sure these match your Atlas database user

## ✅ Success Indicators:
- Migration script completes without errors
- Atlas dashboard shows your collections
- Local app works with Atlas URI
- Ready for Render deployment!

**Ready to start? Run the commands above! 🚀**