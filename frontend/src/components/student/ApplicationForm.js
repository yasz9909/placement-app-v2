import React, { useState } from 'react';
import './ApplicationForm.css';

const ApplicationForm = ({ job, user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    job_id: job.id || job._id,
    full_name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    department: user.department || '',
    cgpa: user.cgpa || '',
    additional_info: ''
  });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }
    setError('');
    setResume(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume) { setError('Please upload your resume (PDF only)'); return; }
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('resume', resume);
    onSubmit(data);
  };

  return (
    <div className="app-form-overlay">
      <div className="app-form-modal">

        {/* Header */}
        <div className="app-form-header">
          <div className="app-form-header-info">
            <h2>🚀 Apply for {job.job_role}</h2>
            <p>📍 {job.company_name} &nbsp;|&nbsp; 💰 {job.salary || 'Not disclosed'} &nbsp;|&nbsp; 📌 {job.location || 'TBA'}</p>
          </div>
          <button onClick={onClose} className="app-form-close">✕</button>
        </div>

        <div className="app-form-body">
          {error && <div className="app-form-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit}>

            {/* Personal Info */}
            <div className="app-form-section">👤 Personal Information</div>
            <div className="app-form-grid-2">
              <div className="app-form-field">
                <label className="app-form-label">Full Name *</label>
                <input className="app-form-input" type="text" value={formData.full_name} onChange={set('full_name')} required />
              </div>
              <div className="app-form-field">
                <label className="app-form-label">Email *</label>
                <input className="app-form-input" type="email" value={formData.email} readOnly />
              </div>
            </div>
            <div className="app-form-grid-2">
              <div className="app-form-field">
                <label className="app-form-label">Phone *</label>
                <input className="app-form-input" type="tel" placeholder="Enter phone number" value={formData.phone} onChange={set('phone')} required />
              </div>
              <div className="app-form-field">
                <label className="app-form-label">Department *</label>
                <input className="app-form-input" type="text" value={formData.department} readOnly />
              </div>
            </div>
            <div className="app-form-field">
              <label className="app-form-label">CGPA *</label>
              <input className="app-form-input" type="number" step="0.01" value={formData.cgpa} readOnly />
            </div>

            {/* Resume Upload */}
            <div className="app-form-section">📄 Resume Upload</div>
            <label htmlFor="resume-upload">
              <div className={`app-form-file-box ${resume ? 'has-file' : ''}`}>
                <div className="app-form-file-icon">{resume ? '✅' : '📎'}</div>
                <p className="app-form-file-text">{resume ? resume.name : 'Click to upload your Resume'}</p>
                <p className="app-form-file-hint">PDF only · Max 5MB</p>
              </div>
            </label>
            <input id="resume-upload" className="app-form-file-input" type="file" accept=".pdf" onChange={handleFileChange} />

            {/* Additional Info */}
            <div className="app-form-section">📝 Additional Information</div>
            <div className="app-form-field">
              <label className="app-form-label">Cover Note (Optional)</label>
              <textarea className="app-form-textarea" placeholder="Tell us why you're a great fit for this role..." value={formData.additional_info} onChange={set('additional_info')} rows="3" />
            </div>

            {/* Actions */}
            <div className="app-form-actions">
              <button type="button" onClick={onClose} className="app-form-cancel">Cancel</button>
              <button type="submit" className="app-form-submit">🚀 Submit Application</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
