# 🚀 Placement Notification App - MongoDB Atlas Version

## ✅ READY TO RUN - No Database Setup Required!

The app is now configured to use **MongoDB Atlas** (cloud database). No local database installation needed!

## 🎯 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd C:\placement-app-v2\backend
npm install

cd C:\placement-app-v2\frontend
npm install
```

### Step 2: Create Admin User
```bash
cd C:\placement-app-v2\backend
npm run seed
```

This creates:
- **Admin Email:** admin@placement.com
- **Admin Password:** admin123

### Step 3: Run the Application

**Terminal 1 - Backend:**
```bash
cd C:\placement-app-v2\backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd C:\placement-app-v2\frontend
npm start
```

**That's it!** Open http://localhost:3000

---

## 🔑 Login Credentials

**Admin:**
- Email: `admin@placement.com`
- Password: `admin123`

**Student:**
- Register new account at `/register`

---

## 📧 Email Notifications Setup (Optional)

To enable email notifications:

1. **Get Gmail App Password:**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password

2. **Update backend/.env:**
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   ```

3. **Restart backend server**

---

## ✨ Features

### For Students:
- ✅ Register and login
- ✅ View all placement opportunities
- ✅ Automatic eligibility checking
- ✅ Apply with resume upload (PDF)
- ✅ Track application status
- ✅ Receive email notifications

### For Admin:
- ✅ Create job postings
- ✅ Edit/Delete jobs
- ✅ Set eligibility criteria (CGPA, Branch, Year)
- ✅ View all applications
- ✅ Update application status

### Automated System:
- ✅ **Cron job runs every hour**
- ✅ **Sends email reminders 24 hours before placement**
- ✅ Professional HTML email templates

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT + Bcrypt
- **Email:** Nodemailer + Gmail
- **Scheduler:** Node-cron

---

## 📁 Project Structure

```
placement-app-v2/
├── backend/
│   ├── src/
│   │   ├── config/database.js (MongoDB connection)
│   │   ├── controllers/ (Business logic)
│   │   ├── models/ (Mongoose schemas)
│   │   ├── routes/ (API endpoints)
│   │   ├── services/ (Email & Cron)
│   │   └── server.js
│   ├── seed.js (Create admin)
│   ├── .env (MongoDB Atlas URI included)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
└── README.md
```

---

## 🧪 Testing Guide

### Test as Student:
1. Register → http://localhost:3000/register
2. Fill: Name, Email, Password, Phone, Department, CGPA, Year
3. Login automatically
4. View jobs
5. Click "Apply Now"
6. System checks eligibility
7. If eligible: Fill form + upload resume (PDF)
8. Submit application
9. Check "My Applications" tab

### Test as Admin:
1. Login → http://localhost:3000/login
2. Email: admin@placement.com / Password: admin123
3. Click "Add New Job"
4. Fill all details
5. Set placement_date (tomorrow for email test)
6. Save
7. View applications
8. Update status

### Test Email Notifications:
1. Create job with placement_date within 24 hours
2. Student applies
3. Wait 1 hour (cron runs hourly)
4. Check student's email for reminder

---

## 🔐 Database Connection

**MongoDB Atlas URI (Already Configured):**
```
mongodb+srv://yaswanth2420_db_user:yaswanth@cluster0.3jygx9w.mongodb.net/placement_app
```

**Collections Created Automatically:**
- users (Admin & Students)
- jobs (Placement postings)
- applications (Student applications)
- notifications (Email logs)

---

## 📊 API Endpoints

### Authentication
```
POST /api/auth/register - Student registration
POST /api/auth/login - Login (admin/student)
GET  /api/auth/profile - Get user profile
```

### Jobs
```
POST   /api/jobs - Create job (admin)
GET    /api/jobs - Get all jobs
GET    /api/jobs/:id - Get single job
PUT    /api/jobs/:id - Update job (admin)
DELETE /api/jobs/:id - Delete job (admin)
GET    /api/jobs/:id/eligibility - Check eligibility (student)
```

### Applications
```
POST /api/applications - Apply for job (student)
GET  /api/applications/my-applications - Get student's applications
GET  /api/applications/job/:jobId - Get job applications (admin)
PUT  /api/applications/:id/status - Update status (admin)
```

---

## 🚨 Troubleshooting

**Backend won't start:**
```bash
cd backend
npm install
npm run dev
```

**Frontend won't start:**
```bash
cd frontend
npm install
npm start
```

**MongoDB connection error:**
- Check internet connection
- MongoDB Atlas URI is already configured
- No local database needed

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## 🎉 What's Different from MySQL Version?

✅ **No local database installation required**
✅ **MongoDB Atlas cloud database (free tier)**
✅ **Automatic schema creation**
✅ **Easier setup - just npm install and run**
✅ **All features work exactly the same**

---

## 📝 Environment Variables

**backend/.env** (Already configured):
```env
PORT=5000
MONGODB_URI=mongodb+srv://yaswanth2420_db_user:yaswanth@cluster0.3jygx9w.mongodb.net/placement_app
JWT_SECRET=placement_app_secret_key_2024
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

---

## 🚀 Deployment

### Backend (Heroku/Render):
- Set MONGODB_URI environment variable
- Deploy from Git

### Frontend (Vercel/Netlify):
- Run `npm run build`
- Deploy build folder

---

## 📚 Documentation

- **README.md** - This file
- **API_DOCUMENTATION.md** - API reference
- **QUICKSTART.md** - Quick setup guide

---

## ✨ Key Features

1. **Cloud Database** - MongoDB Atlas (no local setup)
2. **Automated Emails** - Cron job + Nodemailer
3. **Eligibility Check** - Automatic verification
4. **Resume Upload** - PDF validation
5. **Role-Based Access** - Admin & Student
6. **Secure Auth** - JWT + Bcrypt
7. **Responsive Design** - All devices
8. **Production Ready** - Clean code

---

## 🎓 Support

**Issues?**
- Check console logs
- Verify npm install completed
- Ensure ports 3000 and 5000 are free
- Check internet connection for MongoDB Atlas

---

**Status:** ✅ READY TO USE
**Database:** ✅ MongoDB Atlas (Cloud)
**Setup Time:** ⏱️ 5 minutes

Enjoy your placement notification app! 🎉
