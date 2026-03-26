import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/api';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await forgotPassword(email);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ margin: 'auto', minHeight: 'auto', padding: '50px' }}>
        <div className="card-header">
          <h2>🔑 Forgot Password</h2>
          <p className="card-subtitle">Enter your email to receive a reset link</p>
        </div>
        {error && <div className="error-message">⚠️ {error}</div>}
        {message ? (
          <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '16px', borderRadius: '10px', textAlign: 'center', fontWeight: '600' }}>
            ✅ {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span className="input-icon">📧</span>
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? '⏳ Sending...' : '📨 Send Reset Link'}
            </button>
          </form>
        )}
        <p className="signup-link" style={{ marginTop: '20px' }}>
          <Link to="/student/login">← Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
