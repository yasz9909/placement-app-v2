import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { getAllJobs, checkEligibility, applyForJob, getMyApplications, createPlacement, getMyPlacements, deletePlacement } from '../services/api';
import JobCard from '../components/student/JobCard';
import ApplicationForm from '../components/student/ApplicationForm';
import PlacementForm from '../components/student/PlacementForm';
import './Dashboard.css';

const StudentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPlacementForm, setShowPlacementForm] = useState(false);
  const [activeTab, setActiveTab] = useState('jobs');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchPlacements();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await getMyApplications();
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchPlacements = async () => {
    try {
      const response = await getMyPlacements();
      setPlacements(response.data);
    } catch (error) {
      console.error('Error fetching placements:', error);
    }
  };

  const handleApplyClick = async (job) => {
    try {
      const response = await checkEligibility(job.id);
      setEligibility(response.data);
      setSelectedJob(job);
      
      if (response.data.eligible) {
        setShowForm(true);
      } else {
        setMessage(`Not Eligible: ${response.data.reasons.join(', ')}`);
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      setMessage('Error checking eligibility');
    }
  };

  const handleSubmitApplication = async (formData) => {
    try {
      await applyForJob(formData);
      setMessage('Application submitted successfully!');
      setShowForm(false);
      fetchApplications();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Application failed');
    }
  };

  const handleAddPlacement = async (placementData) => {
    try {
      await createPlacement(placementData);
      setMessage('Placement details added! You will receive email reminder 24 hours before.');
      setShowPlacementForm(false);
      fetchPlacements();
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add placement');
    }
  };

  const handleDeletePlacement = async (id) => {
    if (window.confirm('Are you sure you want to delete this placement?')) {
      try {
        await deletePlacement(id);
        setMessage('Placement deleted successfully');
        fetchPlacements();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Failed to delete placement');
      }
    }
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>Placement Portal</h1>
        <div>
          <span>Welcome, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      
      <div className="content">
        <div className="tabs">
          <button className={activeTab === 'jobs' ? 'active' : ''} onClick={() => setActiveTab('jobs')}>
            Available Jobs
          </button>
          <button className={activeTab === 'placements' ? 'active' : ''} onClick={() => setActiveTab('placements')}>
            My Placements
          </button>
          <button className={activeTab === 'applications' ? 'active' : ''} onClick={() => setActiveTab('applications')}>
            My Applications
          </button>
        </div>

        {message && <div className="message">{message}</div>}

        {activeTab === 'jobs' && (
          <div className="jobs-grid">
            {jobs.map(job => (
              <JobCard key={job.id || job._id} job={job} onApply={handleApplyClick} 
                applied={applications.some(a => a.job_id === (job.id || job._id))} />
            ))}
          </div>
        )}

        {activeTab === 'placements' && (
          <>
            <div className="header">
              <h2>My Placement Schedule</h2>
              <button onClick={() => setShowPlacementForm(true)}>Add Placement</button>
            </div>
            <div className="placements-list">
              {placements.length === 0 ? (
                <p>No placements added yet. Add your placement details to receive email reminders!</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Date & Time</th>
                      <th>Timing</th>
                      <th>Venue</th>
                      <th>Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {placements.map(placement => (
                      <tr key={placement._id}>
                        <td>{placement.company_name}</td>
                        <td>{new Date(placement.placement_date).toLocaleString()}</td>
                        <td>{placement.timing}</td>
                        <td>{placement.venue_details}</td>
                        <td>{placement.additional_notes || '-'}</td>
                        <td>
                          <button onClick={() => handleDeletePlacement(placement._id)} className="btn-delete">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {activeTab === 'applications' && (
          <div className="applications-list">
            {applications.length === 0 ? (
              <p>No applications yet</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Applied On</th>
                    <th>Status</th>
                    <th>Placement Date</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td>{app.company_name}</td>
                      <td>{app.job_role}</td>
                      <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                      <td><span className={`status ${app.status}`}>{app.status}</span></td>
                      <td>{new Date(app.placement_date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {showForm && (
        <ApplicationForm 
          job={selectedJob} 
          user={user}
          onSubmit={handleSubmitApplication}
          onClose={() => setShowForm(false)}
        />
      )}

      {showPlacementForm && (
        <PlacementForm 
          onSubmit={handleAddPlacement}
          onClose={() => setShowPlacementForm(false)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
