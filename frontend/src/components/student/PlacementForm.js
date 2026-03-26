import React, { useState } from 'react';
import './PlacementForm.css';

const PlacementForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    company_name: '',
    job_role: '',
    placement_date: '',
    timing: '',
    venue_details: '',
    additional_notes: ''
  });

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content placement-form">
        <h2>📅 Add Interview Reminder</h2>
        <p style={{ color: '#666', fontSize: '14px', margin: '-8px 0 16px' }}>You'll receive an email reminder 24 hours before your interview</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Company Name (e.g., TCS, Infosys)" value={formData.company_name} onChange={set('company_name')} required />
          <input type="text" placeholder="Job Role (e.g., Software Engineer)" value={formData.job_role} onChange={set('job_role')} required />
          <input type="datetime-local" placeholder="Interview Date & Time" value={formData.placement_date} onChange={set('placement_date')} required />
          <input type="text" placeholder="Timing (e.g., 10:00 AM - 12:00 PM)" value={formData.timing} onChange={set('timing')} required />
          <textarea placeholder="Venue Details" value={formData.venue_details} onChange={set('venue_details')} rows="2" required />
          <textarea placeholder="Additional Notes (optional)" value={formData.additional_notes} onChange={set('additional_notes')} rows="2" />
          <div className="form-actions">
            <button type="submit" className="btn-primary">Set Reminder</button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlacementForm;
