import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { login } from '../services/api';
import { AuthContext } from '../utils/AuthContext';
import './Auth.css';

const Login = ({ userType = 'student' }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData);
      
      if (userType === 'admin' && response.data.user.role !== 'admin') {
        setError('Access denied. Admin credentials required.');
        setLoading(false);
        return;
      }
      
      if (userType === 'student' && response.data.user.role !== 'student') {
        setError('Access denied. Student credentials required.');
        setLoading(false);
        return;
      }
      
      authLogin(response.data.token, response.data.user);
      navigate(response.data.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError('');
      console.log('Google credential received:', credentialResponse);
      
      const response = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      
      const data = await response.json();
      console.log('Backend response:', data);
      
      if (response.ok) {
        authLogin(data.token, data.user);
        navigate(data.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
      } else {
        setError(data.message || data.error || 'Google login failed');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Educational & Tech Pattern Shapes */}
      <span className="pattern-shape shape-graduation">🎓</span>
      <span className="pattern-shape shape-laptop">💻</span>
      <span className="pattern-shape shape-rocket">🚀</span>
      <span className="pattern-shape shape-bulb">💡</span>
      <span className="pattern-shape shape-trophy">🏆</span>
      <span className="pattern-shape shape-book">📚</span>
      <span className="pattern-shape shape-chart">📈</span>
      <span className="pattern-shape shape-target">🎯</span>
      
      {/* Geometric Patterns */}
      <div className="geometric-pattern pattern-1"></div>
      <div className="geometric-pattern pattern-2"></div>
      <div className="geometric-pattern pattern-3"></div>
      
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🎓 Campus Placements 2024</div>
          <h1 className="hero-title">
            Launch Your Career with <span className="gradient-text">Top Companies</span>
          </h1>
          <p className="hero-description">
            Join thousands of students who have successfully landed their dream jobs. 
            Apply to top companies, track your applications, and get placement reminders — all in one place.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Students Placed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Top Companies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12 LPA</span>
              <span className="stat-label">Avg Package</span>
            </div>
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

      <div className="auth-card">
        <div className="card-header">
          <h2>{userType === 'admin' ? '💼 Admin Login' : '🎓 Student Login'}</h2>
          <p className="card-subtitle">
            {userType === 'admin' 
              ? 'Manage placements and student applications' 
              : 'Access your placement dashboard'}
          </p>
        </div>
        
        {error && <div className="error-message">⚠️ {error}</div>}
        
        {userType === 'student' && (
          <>
            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google login failed')}
                useOneTap
                text="signin_with"
                shape="rectangular"
                size="large"
                width="100%"
              />
            </div>

            <div className="divider">
              <span>OR</span>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? '🔄 Logging in...' : '🚀 Login'}
          </button>
        </form>
        
        {userType === 'student' && (
          <p className="signup-link">
            Don't have an account? <Link to="/register">Create Account →</Link>
          </p>
        )}
        
        {userType === 'admin' && (
          <div className="admin-note">
            🔑 Demo: admin@placement.com / admin123
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
