import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import { AuthContext } from '../utils/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', reg_no: '', email: '', password: '', phone: '', department: '', cgpa: '', year: '', timing: '', venue_details: ''
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

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Student Registration</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          <input type="text" placeholder="Registration Number" value={formData.reg_no}
            onChange={(e) => setFormData({ ...formData, reg_no: e.target.value })} required />
          <input type="email" placeholder="Email" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="password" placeholder="Password (min 6 chars)" value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength="6" />
          <input type="tel" placeholder="Phone Number" value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <select value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} required>
            <option value="">Select Department</option>
            <option value="CSE">Computer Science</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics</option>
            <option value="EEE">Electrical</option>
            <option value="MECH">Mechanical</option>
          </select>
          <input type="number" step="0.01" placeholder="CGPA" value={formData.cgpa}
            onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })} required min="0" max="10" />
          <select value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} required>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <input type="text" placeholder="Preferred Timing (e.g., Morning/Afternoon)" value={formData.timing}
            onChange={(e) => setFormData({ ...formData, timing: e.target.value })} />
          <textarea placeholder="Venue Details / Address" value={formData.venue_details}
            onChange={(e) => setFormData({ ...formData, venue_details: e.target.value })} rows="3" />
          <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
        </form>
        <p>Already have an account? <Link to="/student/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
