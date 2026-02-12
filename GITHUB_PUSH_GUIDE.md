# Push to GitHub - Step by Step Guide

## Prerequisites
1. Install Git: https://git-scm.com/download/win
2. Create GitHub account: https://github.com
3. Create new repository on GitHub

## Steps to Push

### 1. Initialize Git Repository
```bash
cd C:\placement-app-v2
git init
```

### 2. Add All Files
```bash
git add .
```

### 3. Commit Changes
```bash
git commit -m "Initial commit: Placement Notification App with email reminders"
```

### 4. Create New Repository on GitHub
- Go to https://github.com/new
- Repository name: `placement-notification-app`
- Description: `Placement notification system with email reminders`
- Keep it Public or Private
- Don't initialize with README (we already have one)
- Click "Create repository"

### 5. Link to GitHub Repository
Replace `YOUR_USERNAME` with your GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/placement-notification-app.git
```

### 6. Push to GitHub
```bash
git branch -M main
git push -u origin main
```

### 7. Enter GitHub Credentials
- Username: your GitHub username
- Password: Use Personal Access Token (not password)

## Get Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Click "Generate token"
5. Copy the token (save it somewhere safe)
6. Use this token as password when pushing

## Quick Commands (Copy-Paste)
```bash
cd C:\placement-app-v2
git init
git add .
git commit -m "Initial commit: Placement Notification App"
git remote add origin https://github.com/YOUR_USERNAME/placement-notification-app.git
git branch -M main
git push -u origin main
```

## Important Notes
- .env files are NOT pushed (protected by .gitignore)
- Your email password is safe
- node_modules are NOT pushed
- uploads folder is NOT pushed

## After Pushing
Your repository will be at:
https://github.com/YOUR_USERNAME/placement-notification-app
