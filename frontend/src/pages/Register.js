import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { register } from '../services/api';
import { AuthContext } from '../utils/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', reg_no: '', email: '', password: '', phone: '', department: '', cgpa: '', year: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await register(formData);
      login(response.data.token, response.data.user);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError('');
      const apiUrl = process.env.REACT_APP_API_URL || 'https://placement-app-v2.onrender.com/api';
      const response = await fetch(`${apiUrl}/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        navigate('/student/dashboard');
      } else {
        setError(data.message || 'Google sign-up failed');
      }
    } catch (err) {
      setError('Google sign-up failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  return (
    <div className="auth-container">
      <span className="pattern-shape shape-graduation">🎓</span>
      <span className="pattern-shape shape-laptop">💻</span>
      <span className="pattern-shape shape-rocket">🚀</span>
      <span className="pattern-shape shape-bulb">💡</span>
      <span className="pattern-shape shape-trophy">🏆</span>
      <span className="pattern-shape shape-book">📚</span>
      <span className="pattern-shape shape-chart">📈</span>
      <span className="pattern-shape shape-target">🎯</span>
      <div className="geometric-pattern pattern-1"></div>
      <div className="geometric-pattern pattern-2"></div>
      <div className="geometric-pattern pattern-3"></div>

      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🎓 Campus Placements 2024</div>
          <h1 className="hero-title">
            Start Your Journey with <span className="gradient-text">Top Companies</span>
          </h1>
          <p className="hero-description">
            Register now to access placement drives, check your eligibility, upload your resume, and get email reminders — all in one place.
          </p>
          <div className="hero-stats">
            <div className="stat-item"><span className="stat-number">500+</span><span className="stat-label">Students Placed</span></div>
            <div className="stat-item"><span className="stat-number">100+</span><span className="stat-label">Top Companies</span></div>
            <div className="stat-item"><span className="stat-number">12 LPA</span><span className="stat-label">Avg Package</span></div>
          </div>
          <div className="company-logos">
            <span className="company-logo">🔍</span>
            <span className="company-logo">🪟</span>
            <span className="company-logo">📦</span>
            <span className="company-logo">💼</span>
            <span className="company-logo">💻</span>
          </div>
        </div>
      </div>

      <div className="auth-card" style={{ overflowY: 'auto', padding: '40px 50px' }}>
        <div className="card-header">
          <h2>🎓 Create Account</h2>
          <p className="card-subtitle">Join the placement portal today</p>
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        <div className="google-login-wrapper">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google sign-up failed')} text="signup_with" shape="rectangular" size="large" width="100%" />
        </div>
        <div className="divider"><span>OR</span></div>

        <form onSubmit={handleSubmit}>
          <div className="register-grid">
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input type="text" placeholder="Full Name" value={formData.name} onChange={set('name')} required />
            </div>
            <div className="input-group">
              <span className="input-icon">🪪</span>
              <input type="text" placeholder="Registration Number" value={formData.reg_no} onChange={set('reg_no')} required />
            </div>
            <div className="input-group">
              <span className="input-icon">📧</span>
              <input type="email" placeholder="Email Address" value={formData.email} onChange={set('email')} required />
            </div>
            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input type="password" placeholder="Password (min 6 chars)" value={formData.password} onChange={set('password')} required minLength="6" />
            </div>
            <div className="input-group">
              <span className="input-icon">📱</span>
              <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={set('phone')} required />
            </div>
            <div className="input-group">
              <span className="input-icon">🏛️</span>
              <select value={formData.department} onChange={set('department')} required style={{ paddingLeft: '48px' }}>
                <option value="">Select Department</option>
                <option value="CSE">Computer Science</option>
                <option value="IT">Information Technology</option>
                <option value="ECE">Electronics</option>
                <option value="EEE">Electrical</option>
                <option value="MECH">Mechanical</option>
              </select>
            </div>
            <div className="input-group">
              <span className="input-icon">⭐</span>
              <input type="number" step="0.01" placeholder="CGPA (0-10)" value={formData.cgpa} onChange={set('cgpa')} required min="0" max="10" />
            </div>
            <div className="input-group">
              <span className="input-icon">📅</span>
              <select value={formData.year} onChange={set('year')} required style={{ paddingLeft: '48px' }}>
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} className="login-btn" style={{ marginTop: '16px' }}>
            {loading ? '🔄 Registering...' : '🚀 Create Account'}
          </button>
        </form>

        <p className="signup-link">Already have an account? <Link to="/student/login">Login here →</Link></p>
      </div>
    </div>
  );
};

export default Register;
