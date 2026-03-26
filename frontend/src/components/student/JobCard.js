import React from 'react';
import './JobCard.css';

const JobCard = ({ job, onApply, applied }) => {
  const getCompanyLogo = (company) => {
    const logos = {
      'Google': '🔍',
      'Microsoft': '🪟',
      'Amazon': '📦',
      'TCS': '💼',
      'Infosys': '💻',
      'Wipro': '🌐',
      'Accenture': '🎯',
      'Cognizant': '🔷',
      'IBM': '🔵',
      'Capgemini': '🟦',
      'Tech Mahindra': '⚙️',
      'Oracle': '🔴'
    };
    return logos[company] || '🏢';
  };

  const isDeadlinePassed = new Date() > new Date(job.application_deadline);
  const daysLeft = Math.ceil((new Date(job.application_deadline) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="modern-job-card">
      <div className="job-card-header">
        <div className="company-logo">{getCompanyLogo(job.company_name)}</div>
        <div className="company-info">
          <h3 className="company-name">{job.company_name}</h3>
          <h4 className="job-role">{job.job_role}</h4>
        </div>
        {applied && <span className="applied-badge">✓ Applied</span>}
      </div>

      <p className="job-description">{job.job_description}</p>

      <div className="job-highlights">
        <div className="highlight-item">
          <span className="highlight-icon">💰</span>
          <div>
            <span className="highlight-label">Salary</span>
            <span className="highlight-value">{job.salary}</span>
          </div>
        </div>
        <div className="highlight-item">
          <span className="highlight-icon">📍</span>
          <div>
            <span className="highlight-label">Location</span>
            <span className="highlight-value">{job.location}</span>
          </div>
        </div>
        <div className="highlight-item">
          <span className="highlight-icon">📅</span>
          <div>
            <span className="highlight-label">Deadline</span>
            <span className="highlight-value">
              {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
            </span>
          </div>
        </div>
      </div>

      <div className="job-requirements">
        <div className="requirement-tag">
          <strong>CGPA:</strong> {job.min_cgpa}+
        </div>
        <div className="requirement-tag">
          <strong>Branch:</strong> {job.eligible_branches}
        </div>
        <div className="requirement-tag">
          <strong>Year:</strong> {job.eligible_years}
        </div>
      </div>

      {job.required_skills && (
        <div className="skills-section">
          <span className="skills-label">Skills:</span>
          <div className="skills-tags">
            {job.required_skills.split(',').map((skill, idx) => (
              <span key={idx} className="skill-tag">{skill.trim()}</span>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={() => onApply(job)} 
        disabled={applied || isDeadlinePassed}
        className={`apply-button ${applied ? 'applied-btn' : ''} ${isDeadlinePassed ? 'disabled-btn' : ''}`}
      >
        {applied ? '✓ Applied' : isDeadlinePassed ? 'Deadline Passed' : 'Apply Now →'}
      </button>
    </div>
  );
};

export default JobCard;
