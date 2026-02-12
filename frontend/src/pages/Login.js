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
      <div className="auth-card">
        <h2>{userType === 'admin' ? 'Admin Login' : 'Student Login'}</h2>
        {error && <div className="error-message">{error}</div>}
        
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
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {userType === 'student' && (
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        )}
      </div>
    </div>
  );
};

export default Login;
