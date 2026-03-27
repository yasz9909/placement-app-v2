import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { getAllJobs, checkEligibility, applyForJob, getMyApplications, createPlacement, getMyPlacements, deletePlacement } from '../services/api';
import JobCard from '../components/student/JobCard';
import ApplicationForm from '../components/student/ApplicationForm';
import PlacementForm from '../components/student/PlacementForm';
import NotificationBell from '../components/student/NotificationBell';
import CompleteProfile from '../components/student/CompleteProfile';
import Sidebar from '../components/common/Sidebar';
import './Dashboard.css';

const StudentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showPlacementForm, setShowPlacementForm] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [message, setMessage] = useState('');
  const needsProfile = !user.department || user.department === 'Not specified' || !user.cgpa || user.cgpa === 0 || !user.year;
  const [showCompleteProfile, setShowCompleteProfile] = useState(needsProfile);

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
      // Check if user has required profile fields
      if (!user.department || !user.cgpa || !user.year) {
        setMessage('Please complete your profile first. Contact admin.');
        setTimeout(() => setMessage(''), 5000);
        return;
      }

      const response = await checkEligibility(job.id || job._id);
      setSelectedJob(job);
      
      if (response.data.eligible) {
        setShowForm(true);
      } else {
        setMessage(`Not Eligible: ${response.data.reasons.join(', ')}`);
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('Eligibility check error:', error);
      setMessage(error.response?.data?.message || 'Error checking eligibility. Please try again.');
      setTimeout(() => setMessage(''), 5000);
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
    <div className="dashboard-layout">
      <Sidebar role="student" activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="dashboard-main">
        <nav className="navbar">
          <h1>Placement Portal</h1>
          <div>
            <NotificationBell userId={user.id} />
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>
        
        <div className="content">
          {message && <div className="message">{message}</div>}

          {activeTab === 'dashboard' && (
            <div className="dashboard-overview">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">💼</div>
                  <div className="stat-info">
                    <h3>{jobs.length}</h3>
                    <p>Available Jobs</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📝</div>
                  <div className="stat-info">
                    <h3>{applications.length}</h3>
                    <p>Applications</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📅</div>
                  <div className="stat-info">
                    <h3>{placements.length}</h3>
                    <p>Placements</p>
                  </div>
                </div>
              </div>
            </div>
          )}

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

          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>My Profile</h2>
              <div className="profile-card">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Department:</strong> {user.department || 'N/A'}</p>
                <p><strong>CGPA:</strong> {user.cgpa || 'N/A'}</p>
                <p><strong>Year:</strong> {user.year || 'N/A'}</p>
              </div>
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

        {showCompleteProfile && (
          <CompleteProfile onComplete={() => setShowCompleteProfile(false)} />
        )}

        {showPlacementForm && (
          <PlacementForm 
            onSubmit={handleAddPlacement}
            onClose={() => setShowPlacementForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
