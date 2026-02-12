import React, { useState } from 'react';

const ApplicationForm = ({ job, user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    job_id: job.id,
    full_name: user.name,
    email: user.email,
    phone: user.phone || '',
    department: user.department,
    cgpa: user.cgpa,
    additional_info: ''
  });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!resume) {
      setError('Please upload your resume (PDF only)');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    data.append('resume', resume);

    onSubmit(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Apply for {job.job_role} at {job.company_name}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} required />
          <input type="email" placeholder="Email" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="tel" placeholder="Phone" value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
          <input type="text" placeholder="Department" value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })} required />
          <input type="number" step="0.01" placeholder="CGPA" value={formData.cgpa}
            onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })} required />
          <textarea placeholder="Additional Information (Optional)" value={formData.additional_info}
            onChange={(e) => setFormData({ ...formData, additional_info: e.target.value })} rows="3" />
          <div className="file-upload">
            <label>Upload Resume (PDF only) *</label>
            <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} required />
          </div>
          <div className="form-actions">
            <button type="submit">Submit Application</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
