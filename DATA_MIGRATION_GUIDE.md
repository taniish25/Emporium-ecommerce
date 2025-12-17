# 📊 Data Migration Guide: Local MongoDB → Atlas

## Prerequisites
1. **MongoDB Atlas cluster** set up (follow DEPLOYMENT_GUIDE.md first)
2. **Local MongoDB** running with your data
3. **Atlas connection string** ready

## Step-by-Step Migration

### 1. **Export Local Data (Backup Method)**
```bash
# Navigate to your project
cd backend

# Export each collection
mongodump --host localhost:27017 --db emporium --out ./backup

# This creates a backup folder with your data
```

### 2. **Import to Atlas (Backup Method)**
```bash
# Import to Atlas (replace with your Atlas URI)
mongorestore --uri "mongodb+srv://username:password@cluster.mongodb.net/emporium" ./backup/emporium
```

### 3. **Script Migration (Recommended)**

#### A. Update Environment Variables
Create/update your `.env` file in the backend directory:
```env
# Local MongoDB (current)
MONGODB_URI=mongodb://localhost:27017/emporium

# Atlas MongoDB (new - get this from Atlas dashboard)
MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/emporium

JWT_SECRET=your_jwt_secret
PORT=5000
```

#### B. Run Migration Script
```bash
# Navigate to backend directory
cd backend

# Install dependencies if not already done
npm install

# Run the migration script
node migrate-to-atlas.js
```

### 4. **Verify Migration**
1. **Check Atlas Dashboard**:
   - Go to your Atlas cluster
   - Click "Browse Collections"
   - Verify your data is there

2. **Test Connection**:
   ```bash
   # Update your .env to use Atlas URI
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/emporium
   
   # Start your backend
   npm run dev
   
   # Test API endpoints
   ```

## 🔧 Troubleshooting

### Common Issues:

**1. Connection Timeout**
```
Error: connection timed out
```
**Solution**: Check Atlas Network Access - ensure 0.0.0.0/0 is whitelisted

**2. Authentication Failed**
```
Error: Authentication failed
```
**Solution**: 
- Verify username/password in connection string
- Check Database User permissions in Atlas

**3. Database Not Found**
```
Error: database does not exist
```
**Solution**: The database will be created automatically when you insert data

**4. Duplicate Key Error**
```
Error: duplicate key error
```
**Solution**: Clear Atlas database first or use `upsert` operations

### Manual Verification Commands:
```bash
# Check local data count
mongo mongodb://localhost:27017/emporium --eval "db.users.count()"
mongo mongodb://localhost:27017/emporium --eval "db.products.count()"

# Check Atlas data count (replace with your URI)
mongo "mongodb+srv://username:password@cluster.mongodb.net/emporium" --eval "db.users.count()"
```

## 🚀 After Migration

1. **Update your .env**:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/emporium
   ```

2. **Test locally** with Atlas connection

3. **Deploy to Render** using the Atlas URI

4. **Keep local backup** until deployment is confirmed working

## 📝 Migration Checklist
- [ ] Atlas cluster created
- [ ] Database user created with read/write permissions
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained
- [ ] Local data backed up
- [ ] Migration script executed successfully
- [ ] Data verified in Atlas dashboard
- [ ] Local app tested with Atlas connection
- [ ] Ready for Render deployment

## ⚠️ Important Notes
- **Free Atlas tier**: 512MB storage limit
- **Connection limits**: M0 clusters have 100 connection limit
- **Backup**: Always backup before migration
- **Testing**: Test thoroughly before going live