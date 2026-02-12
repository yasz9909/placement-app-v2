-- Placement Notification App Database Schema
CREATE DATABASE IF NOT EXISTS placement_app;
USE placement_app;

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL DEFAULT 'student',
    phone VARCHAR(15),
    department VARCHAR(50),
    cgpa DECIMAL(3,2),
    year INT,
    resume_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB;

-- Jobs Table
CREATE TABLE jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100) NOT NULL,
    job_role VARCHAR(100) NOT NULL,
    job_description TEXT NOT NULL,
    requirements TEXT,
    salary VARCHAR(50),
    location VARCHAR(100),
    eligible_branches VARCHAR(255),
    min_cgpa DECIMAL(3,2),
    eligible_years VARCHAR(50),
    required_skills TEXT,
    placement_date DATETIME NOT NULL,
    application_deadline DATETIME NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_placement_date (placement_date)
) ENGINE=InnoDB;

-- Applications Table
CREATE TABLE applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    student_id INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    department VARCHAR(50) NOT NULL,
    cgpa DECIMAL(3,2) NOT NULL,
    resume_url VARCHAR(255) NOT NULL,
    additional_info TEXT,
    status ENUM('pending', 'shortlisted', 'rejected', 'selected') DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (job_id, student_id),
    INDEX idx_job_id (job_id)
) ENGINE=InnoDB;

-- Notifications Table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    student_id INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('sent', 'failed') DEFAULT 'sent',
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
