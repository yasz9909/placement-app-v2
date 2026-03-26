import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { resetPassword } from '../services/api';
import './Auth.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setError('Passwords do not match');
    setLoading(true);
    setError('');
    try {
      await resetPassword(token, password);
      navigate('/student/login', { state: { message: 'Password reset successful. Please login.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ margin: 'auto', minHeight: 'auto', padding: '50px' }}>
        <div className="card-header">
          <h2>🔒 Reset Password</h2>
          <p className="card-subtitle">Enter your new password</p>
        </div>
        {error && <div className="error-message">⚠️ {error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input type="password" placeholder="New Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
          </div>
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input type="password" placeholder="Confirm New Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength="6" />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '⏳ Resetting...' : '✅ Reset Password'}
          </button>
        </form>
        <p className="signup-link" style={{ marginTop: '20px' }}>
          <Link to="/student/login">← Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
