import React, { useState } from 'react';
import './JobForm.css';

const JobForm = ({ job, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(job || {
    company_name: '', job_role: '', job_description: '', requirements: '',
    salary: '', location: '', eligible_branches: '', min_cgpa: '',
    eligible_years: '', required_skills: '', placement_date: '', application_deadline: ''
  });

  const set = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="job-form-overlay">
      <div className="job-form-modal">

        {/* Header */}
        <div className="job-form-header">
          <div>
            <h2>{job ? '✏️ Edit Job Posting' : '➕ Create New Job'}</h2>
            <p>Fill in the placement drive details below</p>
          </div>
          <button onClick={onClose} className="job-form-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="job-form-body">

          {/* Section: Basic Info */}
          <div className="job-form-section">📋 Basic Information</div>
          <div className="job-form-grid-2">
            <div className="job-form-field">
              <label className="job-form-label">Company Name *</label>
              <input className="job-form-input" type="text" placeholder="e.g. Google, Microsoft" value={formData.company_name} onChange={set('company_name')} required />
            </div>
            <div className="job-form-field">
              <label className="job-form-label">Job Role *</label>
              <input className="job-form-input" type="text" placeholder="e.g. Software Engineer" value={formData.job_role} onChange={set('job_role')} required />
            </div>
          </div>
          <div className="job-form-field">
            <label className="job-form-label">Job Description *</label>
            <textarea className="job-form-textarea" placeholder="Describe the role, responsibilities, and what the candidate will be working on..." value={formData.job_description} onChange={set('job_description')} required rows="3" />
          </div>
          <div className="job-form-field">
            <label className="job-form-label">Requirements</label>
            <textarea className="job-form-textarea" placeholder="Skills, experience, qualifications needed..." value={formData.requirements} onChange={set('requirements')} rows="2" />
          </div>

          {/* Section: Job Details */}
          <div className="job-form-section">💰 Job Details</div>
          <div className="job-form-grid-2">
            <div className="job-form-field">
              <label className="job-form-label">Salary / Package</label>
              <input className="job-form-input" type="text" placeholder="e.g. ₹12-15 LPA" value={formData.salary} onChange={set('salary')} />
            </div>
            <div className="job-form-field">
              <label className="job-form-label">Location</label>
              <input className="job-form-input" type="text" placeholder="e.g. Bangalore, Hyderabad" value={formData.location} onChange={set('location')} />
            </div>
          </div>
          <div className="job-form-field">
            <label className="job-form-label">Required Skills</label>
            <input className="job-form-input" type="text" placeholder="e.g. Java, Python, React, Node.js" value={formData.required_skills} onChange={set('required_skills')} />
          </div>

          {/* Section: Eligibility */}
          <div className="job-form-section">✅ Eligibility Criteria</div>
          <div className="job-form-grid-3">
            <div className="job-form-field">
              <label className="job-form-label">Eligible Branches</label>
              <input className="job-form-input" type="text" placeholder="e.g. CSE, IT, ECE" value={formData.eligible_branches} onChange={set('eligible_branches')} />
            </div>
            <div className="job-form-field">
              <label className="job-form-label">Minimum CGPA</label>
              <input className="job-form-input" type="number" step="0.01" min="0" max="10" placeholder="e.g. 7.5" value={formData.min_cgpa} onChange={set('min_cgpa')} />
            </div>
            <div className="job-form-field">
              <label className="job-form-label">Eligible Years</label>
              <input className="job-form-input" type="text" placeholder="e.g. 3, 4" value={formData.eligible_years} onChange={set('eligible_years')} />
            </div>
          </div>

          {/* Section: Schedule */}
          <div className="job-form-section">📅 Important Dates</div>
          <div className="job-form-grid-2">
            <div className="job-form-field">
              <label className="job-form-label">Placement Date & Time *</label>
              <input className="job-form-input" type="datetime-local" value={formData.placement_date} onChange={set('placement_date')} required />
            </div>
            <div className="job-form-field">
              <label className="job-form-label">Application Deadline *</label>
              <input className="job-form-input" type="datetime-local" value={formData.application_deadline} onChange={set('application_deadline')} required />
            </div>
          </div>

          {/* Actions */}
          <div className="job-form-actions">
            <button type="button" onClick={onClose} className="job-form-cancel">Cancel</button>
            <button type="submit" className="job-form-submit">{job ? '✅ Update Job' : '🚀 Create Job'}</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default JobForm;
