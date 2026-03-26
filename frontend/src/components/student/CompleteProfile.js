import React, { useState, useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import { updateProfile } from '../../services/api';

const CompleteProfile = ({ onComplete }) => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    reg_no: '', phone: '', department: '', cgpa: '', year: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await updateProfile(formData);
      login(localStorage.getItem('token'), { ...user, ...response.data.user });
      onComplete();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>🎓 Complete Your Profile</h2>
        <p style={styles.subtitle}>Fill in your details to apply for placement drives</p>
        {error && <div style={styles.error}>⚠️ {error}</div>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="text" placeholder="Registration Number" value={formData.reg_no} onChange={set('reg_no')} required />
          <input style={styles.input} type="tel" placeholder="Phone Number" value={formData.phone} onChange={set('phone')} required />
          <select style={styles.input} value={formData.department} onChange={set('department')} required>
            <option value="">Select Department</option>
            <option value="CSE">Computer Science</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics</option>
            <option value="EEE">Electrical</option>
            <option value="MECH">Mechanical</option>
          </select>
          <input style={styles.input} type="number" step="0.01" placeholder="CGPA (0-10)" value={formData.cgpa} onChange={set('cgpa')} required min="0" max="10" />
          <select style={styles.input} value={formData.year} onChange={set('year')} required>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? '⏳ Saving...' : '✅ Save & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' },
  title: { margin: '0 0 8px', fontSize: '24px', color: '#1a1a1a' },
  subtitle: { margin: '0 0 24px', color: '#666', fontSize: '14px' },
  error: { background: '#fee', color: '#c33', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' },
  input: { width: '100%', padding: '12px 16px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '15px', marginBottom: '14px', boxSizing: 'border-box', outline: 'none' },
  btn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }
};

export default CompleteProfile;
