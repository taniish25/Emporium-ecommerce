# Deployment Guide

## MongoDB Atlas Setup (Required for Render deployment)

Since you're currently using `mongodb://localhost:27017/`, you need to set up a cloud database for deployment.

### Step 1: Create MongoDB Atlas Account
1. Go to https://cloud.mongodb.com/
2. Sign up for free account
3. Create new project named "Emporium"

### Step 2: Create Free Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier - 512MB)
3. Select cloud provider and region closest to you
4. Name your cluster "emporium-cluster"
5. Click "Create Cluster"

### Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `emporium-user`
5. Generate secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go back to "Database" and click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and version "4.1 or later"
4. Copy the connection string:
   ```
   mongodb+srv://emporium-user:<password>@emporium-cluster.xxxxx.mongodb.net/emporium?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password

### Step 6: Update Environment Variables
When deploying on Render, use this connection string as your `MONGODB_URI`:
```
MONGODB_URI=mongodb+srv://emporium-user:your_password@emporium-cluster.xxxxx.mongodb.net/emporium?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
NODE_ENV=production
```

## Render Deployment Steps

### Backend Deployment
1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect GitHub repository: `taniish25/Emporium-ecommerce`
4. Configure:
   - Name: `emporium-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables (from Step 6 above)
6. Click "Create Web Service"

### Frontend Deployment
1. Click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - Name: `emporium-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`
4. Add environment variable:
   ```
   REACT_APP_API_URL=https://emporium-backend.onrender.com
   ```
5. Click "Create Static Site"

## Important Notes
- Free tier services sleep after 15 minutes of inactivity
- First request after sleep may take 30-60 seconds
- MongoDB Atlas M0 is free forever (512MB storage)
- Keep your database credentials secure

## Troubleshooting
- If deployment fails, check the logs in Render dashboard
- Ensure all environment variables are set correctly
- Verify MongoDB Atlas network access allows all IPs