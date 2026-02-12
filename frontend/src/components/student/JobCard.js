import React from 'react';

const JobCard = ({ job, onApply, applied }) => {
  return (
    <div className="job-card">
      <h3>{job.company_name}</h3>
      <p className="job-role">{job.job_role}</p>
      <p>{job.job_description}</p>
      <div className="job-details">
        {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
        {job.location && <p><strong>Location:</strong> {job.location}</p>}
        <p><strong>Min CGPA:</strong> {job.min_cgpa || 'N/A'}</p>
        <p><strong>Eligible Branches:</strong> {job.eligible_branches || 'All'}</p>
        <p><strong>Placement Date:</strong> {new Date(job.placement_date).toLocaleString()}</p>
        <p><strong>Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}</p>
      </div>
      <button 
        onClick={() => onApply(job)} 
        disabled={applied || new Date() > new Date(job.application_deadline)}
        className={applied ? 'applied' : ''}
      >
        {applied ? 'Applied' : new Date() > new Date(job.application_deadline) ? 'Deadline Passed' : 'Apply Now'}
      </button>
    </div>
  );
};

export default JobCard;
