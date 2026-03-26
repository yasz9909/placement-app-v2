import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { getAllJobs, createJob, updateJob, deleteJob, getJobApplications } from '../services/api';
import JobForm from '../components/admin/JobForm';
import StudentsView from '../components/admin/StudentsView';
import ApplicationsView from '../components/admin/ApplicationsView';
import SettingsView from '../components/admin/SettingsView';
import Sidebar from '../components/common/Sidebar';
import './Dashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [selectedJobApps, setSelectedJobApps] = useState(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ students: 0, jobs: 0, applications: 0, placements: 0 });

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const jobsRes = await getAllJobs();
      setStats({
        students: 8,
        jobs: jobsRes.data.length,
        applications: 15,
        placements: 2
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleCreateJob = async (jobData) => {
    try {
      await createJob(jobData);
      setMessage('Job created successfully!');
      setShowForm(false);
      fetchJobs();
      fetchStats();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error creating job');
    }
  };

  const handleUpdateJob = async (jobData) => {
    try {
      await updateJob(editingJob.id, jobData);
      setMessage('Job updated successfully!');
      setShowForm(false);
      setEditingJob(null);
      fetchJobs();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating job');
    }
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        setMessage('Job deleted successfully!');
        fetchJobs();
        fetchStats();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting job');
      }
    }
  };

  const viewApplications = async (jobId) => {
    try {
      const response = await getJobApplications(jobId);
      setSelectedJobApps(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar role="admin" activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="dashboard-main">
        <nav className="navbar">
          <h1>💼 Admin Panel</h1>
          <div>
            <span>Welcome, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>

        <div className="content">
          {activeTab === 'dashboard' && (
            <div className="stats-grid">
              <div className="stat-card students">
                <div className="stat-icon">🎓</div>
                <div className="stat-info">
                  <h3>{stats.students}</h3>
                  <p>Total Students</p>
                </div>
              </div>
              <div className="stat-card jobs">
                <div className="stat-icon">💼</div>
                <div className="stat-info">
                  <h3>{stats.jobs}</h3>
                  <p>Active Jobs</p>
                </div>
              </div>
              <div className="stat-card applications">
                <div className="stat-icon">📄</div>
                <div className="stat-info">
                  <h3>{stats.applications}</h3>
                  <p>Applications</p>
                </div>
              </div>
              <div className="stat-card placements">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>{stats.placements}</h3>
                  <p>Placements</p>
                </div>
              </div>
            </div>
          )}

          {message && <div className="message">{message}</div>}

          {activeTab === 'jobs' && (
            <>
              <div className="header">
                <h2>Manage Placements</h2>
                <button onClick={() => { setShowForm(true); setEditingJob(null); }}>
                  + Add New Job
                </button>
              </div>

              <div className="jobs-table">
                <table>
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Role</th>
                      <th>Location</th>
                      <th>Min CGPA</th>
                      <th>Placement Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map(job => (
                      <tr key={job.id}>
                        <td>{job.company_name}</td>
                        <td>{job.job_role}</td>
                        <td>{job.location}</td>
                        <td>{job.min_cgpa}</td>
                        <td>{new Date(job.placement_date).toLocaleDateString()}</td>
                        <td>
                          <button onClick={() => { setEditingJob(job); setShowForm(true); }}>Edit</button>
                          <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
                          <button onClick={() => viewApplications(job.id)}>View Applications</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'students' && <StudentsView />}

          {activeTab === 'applications' && <ApplicationsView />}

          {activeTab === 'settings' && <SettingsView user={user} />}

          {selectedJobApps && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Applications</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>CGPA</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedJobApps.map(app => (
                      <tr key={app.id}>
                        <td>{app.full_name}</td>
                        <td>{app.email}</td>
                        <td>{app.department}</td>
                        <td>{app.cgpa}</td>
                        <td>{app.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={() => setSelectedJobApps(null)}>Close</button>
              </div>
            </div>
          )}
        </div>

        {showForm && (
          <JobForm
            job={editingJob}
            onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
            onClose={() => { setShowForm(false); setEditingJob(null); }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
