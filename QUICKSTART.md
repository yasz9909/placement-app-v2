# 🚀 QUICK START GUIDE

## Prerequisites Checklist
- [ ] Node.js installed (v14+)
- [ ] MySQL installed (v8+)
- [ ] Gmail account with App Password

## 5-Minute Setup

### 1. Database Setup (2 minutes)
```bash
# Login to MySQL
mysql -u root -p

# Create database and tables
source backend/database/schema.sql

# Create admin user
INSERT INTO users (name, email, password, role) VALUES 
('Admin', 'admin@placement.com', '$2a$10$rZ5YhJKvXqKqXqKqXqKqXeO7vZ5YhJKvXqKqXqKqXqKqXqKqXqKqX', 'admin');

# Exit
exit;
```

### 2. Backend Setup (1 minute)
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

### 3. Frontend Setup (1 minute)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

### 4. Gmail App Password (1 minute)
1. Google Account → Security → 2-Step Verification
2. App Passwords → Generate
3. Copy 16-character password
4. Add to backend/.env as EMAIL_PASSWORD

## Test Credentials

**Admin:**
- Email: admin@placement.com
- Password: admin123

**Student:**
- Register new account at /register

## Quick Test Flow

### As Admin:
1. Login → http://localhost:3000/login
2. Click "Add New Job"
3. Fill details (set placement_date to tomorrow)
4. Save

### As Student:
1. Register → http://localhost:3000/register
2. View jobs
3. Click "Apply Now"
4. Upload resume (PDF)
5. Submit

### Email Notification:
- Cron runs every hour
- Sends emails for placements within 24 hours
- Check student email after 1 hour

## Troubleshooting

**Port already in use:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

**MySQL connection error:**
- Check MySQL is running
- Verify credentials in .env
- Ensure database exists

**Email not sending:**
- Verify Gmail App Password
- Check 2-Step Verification enabled
- Review console logs

## Project URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/health

## Next Steps

1. Customize email templates in `backend/src/services/emailService.js`
2. Add more eligibility criteria
3. Implement file download for resumes
4. Add analytics dashboard
5. Deploy to production

## Support

Check:
- README.md - Full documentation
- API_DOCUMENTATION.md - API reference
- Console logs for errors
