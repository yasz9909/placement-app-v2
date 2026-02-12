import React, { useState } from 'react';
import './PlacementForm.css';

const PlacementForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    company_name: '',
    placement_date: '',
    timing: '',
    venue_details: '',
    additional_notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content placement-form">
        <h2>Add Placement Details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            required
          />
          
          <input
            type="datetime-local"
            placeholder="Placement Date & Time"
            value={formData.placement_date}
            onChange={(e) => setFormData({ ...formData, placement_date: e.target.value })}
            required
          />
          
          <input
            type="text"
            placeholder="Timing (e.g., 10:00 AM - 12:00 PM)"
            value={formData.timing}
            onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
            required
          />
          
          <textarea
            placeholder="Venue Details"
            value={formData.venue_details}
            onChange={(e) => setFormData({ ...formData, venue_details: e.target.value })}
            rows="3"
            required
          />
          
          <textarea
            placeholder="Additional Notes (optional)"
            value={formData.additional_notes}
            onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
            rows="2"
          />
          
          <div className="form-actions">
            <button type="submit" className="btn-primary">Add Placement</button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlacementForm;
