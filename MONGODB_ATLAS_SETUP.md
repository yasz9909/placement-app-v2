# MongoDB Atlas Setup Guide

## Issue: Connection Refused Error

Your MongoDB Atlas connection is failing. Follow these steps:

## Step 1: Check Network Access (IP Whitelist)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Login to your account
3. Select your project
4. Click **Network Access** (left sidebar)
5. Click **Add IP Address**
6. Choose **Allow Access from Anywhere** (0.0.0.0/0)
7. Click **Confirm**

## Step 2: Verify Database User

1. Click **Database Access** (left sidebar)
2. Verify user: `yaswanth2420_db_user`
3. Password: `yaswanth`
4. If not exists, create new user with these credentials

## Step 3: Get Correct Connection String

1. Click **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with: `yaswanth`
6. Add database name: `/placement_app`

## Step 4: Update .env File

Your connection string should look like:
```
MONGODB_URI=mongodb+srv://yaswanth2420_db_user:yaswanth@cluster0.3jygx9w.mongodb.net/placement_app?retryWrites=true&w=majority
```

## Step 5: Test Connection

Restart backend:
```bash
cd C:\placement-app-v2\backend
npm start
```

Look for: `MongoDB connected successfully`

## Alternative: Use MongoDB Atlas Free Tier

If your cluster is paused or deleted:
1. Create new FREE cluster (M0)
2. Create database user
3. Whitelist IP (0.0.0.0/0)
4. Get new connection string
5. Update .env file
