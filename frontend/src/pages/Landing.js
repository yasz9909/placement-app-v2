import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Placement Notification Portal</h1>
        <p>Welcome to the Placement Management System</p>
        
        <div className="login-options">
          <div className="login-card" onClick={() => navigate('/admin/login')}>
            <div className="icon">👨‍💼</div>
            <h2>Admin Login</h2>
            <p>Manage placements and view student details</p>
          </div>
          
          <div className="login-card" onClick={() => navigate('/student/login')}>
            <div className="icon">👨‍🎓</div>
            <h2>Student Login</h2>
            <p>Register and apply for placements</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
