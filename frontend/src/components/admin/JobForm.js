import React, { useState } from 'react';

const JobForm = ({ job, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(job || {
    company_name: '',
    job_role: '',
    job_description: '',
    requirements: '',
    salary: '',
    location: '',
    eligible_branches: '',
    min_cgpa: '',
    eligible_years: '',
    required_skills: '',
    placement_date: '',
    application_deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <h2>{job ? 'Edit Job' : 'Create New Job'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" placeholder="Company Name *" value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} required />
            <input type="text" placeholder="Job Role *" value={formData.job_role}
              onChange={(e) => setFormData({ ...formData, job_role: e.target.value })} required />
          </div>
          <textarea placeholder="Job Description *" value={formData.job_description}
            onChange={(e) => setFormData({ ...formData, job_description: e.target.value })} required rows="3" />
          <textarea placeholder="Requirements" value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} rows="2" />
          <div className="form-row">
            <input type="text" placeholder="Salary" value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })} />
            <input type="text" placeholder="Location" value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Eligible Branches (e.g., CSE, IT)" value={formData.eligible_branches}
              onChange={(e) => setFormData({ ...formData, eligible_branches: e.target.value })} />
            <input type="number" step="0.01" placeholder="Min CGPA" value={formData.min_cgpa}
              onChange={(e) => setFormData({ ...formData, min_cgpa: e.target.value })} />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Eligible Years (e.g., 3, 4)" value={formData.eligible_years}
              onChange={(e) => setFormData({ ...formData, eligible_years: e.target.value })} />
            <input type="text" placeholder="Required Skills" value={formData.required_skills}
              onChange={(e) => setFormData({ ...formData, required_skills: e.target.value })} />
          </div>
          <div className="form-row">
            <div>
              <label>Placement Date & Time *</label>
              <input type="datetime-local" value={formData.placement_date}
                onChange={(e) => setFormData({ ...formData, placement_date: e.target.value })} required />
            </div>
            <div>
              <label>Application Deadline *</label>
              <input type="datetime-local" value={formData.application_deadline}
                onChange={(e) => setFormData({ ...formData, application_deadline: e.target.value })} required />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit">{job ? 'Update' : 'Create'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
