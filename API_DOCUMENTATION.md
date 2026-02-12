# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register Student
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "department": "CSE",
  "cgpa": 8.5,
  "year": 3
}
```

**Response:**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "admin@placement.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@placement.com",
    "role": "admin"
  }
}
```

### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "department": "CSE",
  "cgpa": 8.5,
  "year": 3
}
```

---

## Job Endpoints

### Create Job (Admin Only)
```http
POST /jobs
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "company_name": "Google",
  "job_role": "Software Engineer",
  "job_description": "Full-stack development role",
  "requirements": "Strong coding skills, DSA knowledge",
  "salary": "18 LPA",
  "location": "Bangalore",
  "eligible_branches": "CSE, IT",
  "min_cgpa": 7.5,
  "eligible_years": "3, 4",
  "required_skills": "React, Node.js, MySQL",
  "placement_date": "2024-12-25T10:00:00",
  "application_deadline": "2024-12-20T23:59:59"
}
```

**Response:**
```json
{
  "message": "Job created successfully",
  "jobId": 1
}
```

### Get All Jobs
```http
GET /jobs
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "company_name": "Google",
    "job_role": "Software Engineer",
    "job_description": "Full-stack development role",
    "salary": "18 LPA",
    "location": "Bangalore",
    "min_cgpa": 7.5,
    "eligible_branches": "CSE, IT",
    "eligible_years": "3, 4",
    "placement_date": "2024-12-25T10:00:00",
    "application_deadline": "2024-12-20T23:59:59",
    "created_at": "2024-01-01T00:00:00"
  }
]
```

### Get Single Job
```http
GET /jobs/:id
Authorization: Bearer <token>
```

### Update Job (Admin Only)
```http
PUT /jobs/:id
Authorization: Bearer <admin_token>
```

**Request Body:** Same as Create Job

### Delete Job (Admin Only)
```http
DELETE /jobs/:id
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "message": "Job deleted successfully"
}
```

### Check Eligibility (Student Only)
```http
GET /jobs/:id/eligibility
Authorization: Bearer <student_token>
```

**Response (Eligible):**
```json
{
  "eligible": true,
  "reasons": []
}
```

**Response (Not Eligible):**
```json
{
  "eligible": false,
  "reasons": [
    "Minimum CGPA required: 7.5",
    "Eligible branches: CSE, IT"
  ]
}
```

---

## Application Endpoints

### Apply for Job (Student Only)
```http
POST /applications
Authorization: Bearer <student_token>
Content-Type: multipart/form-data
```

**Form Data:**
```
job_id: 1
full_name: John Doe
email: john@example.com
phone: 1234567890
department: CSE
cgpa: 8.5
additional_info: Interested in backend development
resume: [PDF file]
```

**Response:**
```json
{
  "message": "Application submitted successfully",
  "applicationId": 1
}
```

**Error Response (Not Eligible):**
```json
{
  "message": "You are not eligible for this job",
  "reasons": [
    "Minimum CGPA required: 7.5"
  ]
}
```

### Get My Applications (Student Only)
```http
GET /applications/my-applications
Authorization: Bearer <student_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "job_id": 1,
    "company_name": "Google",
    "job_role": "Software Engineer",
    "status": "pending",
    "applied_at": "2024-01-01T00:00:00",
    "placement_date": "2024-12-25T10:00:00"
  }
]
```

### Get Job Applications (Admin Only)
```http
GET /applications/job/:jobId
Authorization: Bearer <admin_token>
```

**Response:**
```json
[
  {
    "id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "department": "CSE",
    "cgpa": 8.5,
    "resume_url": "/uploads/resumes/resume-123456.pdf",
    "status": "pending",
    "applied_at": "2024-01-01T00:00:00"
  }
]
```

### Update Application Status (Admin Only)
```http
PUT /applications/:id/status
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "status": "shortlisted"
}
```

**Status Options:** `pending`, `shortlisted`, `rejected`, `selected`

**Response:**
```json
{
  "message": "Application status updated successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "All required fields must be provided"
}
```

### 401 Unauthorized
```json
{
  "message": "Access denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "message": "Access denied. Admin only."
}
```

### 404 Not Found
```json
{
  "message": "Job not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "department": "CSE",
    "cgpa": 8.5,
    "year": 3
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@placement.com",
    "password": "admin123"
  }'
```

### Create Job
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "company_name": "Google",
    "job_role": "Software Engineer",
    "job_description": "Full-stack development",
    "requirements": "Strong coding skills",
    "salary": "18 LPA",
    "location": "Bangalore",
    "min_cgpa": 7.5,
    "placement_date": "2024-12-25T10:00:00",
    "application_deadline": "2024-12-20T23:59:59"
  }'
```

### Apply for Job
```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "job_id=1" \
  -F "full_name=John Doe" \
  -F "email=john@example.com" \
  -F "phone=1234567890" \
  -F "department=CSE" \
  -F "cgpa=8.5" \
  -F "resume=@/path/to/resume.pdf"
```
