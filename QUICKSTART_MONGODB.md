# ⚡ QUICK START - 3 Commands

## 1. Install Dependencies

```bash
cd C:\placement-app-v2\backend
npm install

cd C:\placement-app-v2\frontend
npm install
```

## 2. Create Admin User

```bash
cd C:\placement-app-v2\backend
npm run seed
```

**Admin Created:**
- Email: admin@placement.com
- Password: admin123

## 3. Run Application

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

## ✅ Done!

Open: http://localhost:3000

**Login as Admin:**
- Email: admin@placement.com
- Password: admin123

**Or Register as Student:**
- Click "Register" link

---

## 📧 Enable Email Notifications (Optional)

Edit `backend/.env`:
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

Get Gmail App Password:
1. Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password
4. Copy 16-character password

---

## 🎯 Features

- ✅ Student registration & login
- ✅ Admin dashboard
- ✅ Job postings with eligibility
- ✅ Resume upload (PDF)
- ✅ Application tracking
- ✅ Email notifications (24-hour reminders)
- ✅ MongoDB Atlas (cloud database)

---

**No database setup needed - MongoDB Atlas is already configured!**
