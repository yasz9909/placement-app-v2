import React, { useState, useEffect } from 'react';
import { getJobApplications, updateApplicationStatus } from '../../services/api';
import './ApplicationsView.css';

const ApplicationsView = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      // Mock applications data
      const mockApplications = [
        {
          id: 1,
          student_name: 'Yaswanth Kumar',
          email: 'yaswanth2420@gmail.com',
          company_name: 'Google',
          job_role: 'Software Engineer',
          department: 'CSE',
          cgpa: 8.5,
          year: 4,
          status: 'pending',
          applied_at: new Date('2024-01-15'),
          resume_url: '/uploads/resume1.pdf'
        },
        {
          id: 2,
          student_name: 'Priya Sharma',
          email: 'priya.sharma@student.com',
          company_name: 'Microsoft',
          job_role: 'Full Stack Developer',
          department: 'IT',
          cgpa: 9.2,
          year: 3,
          status: 'shortlisted',
          applied_at: new Date('2024-01-16'),
          resume_url: '/uploads/resume2.pdf'
        },
        {
          id: 3,
          student_name: 'Amit Patel',
          email: 'amit.patel@student.com',
          company_name: 'Amazon',
          job_role: 'SDE-1',
          department: 'ECE',
          cgpa: 7.8,
          year: 4,
          status: 'selected',
          applied_at: new Date('2024-01-17'),
          resume_url: '/uploads/resume3.pdf'
        },
        {
          id: 4,
          student_name: 'Sneha Reddy',
          email: 'sneha.reddy@student.com',
          company_name: 'TCS',
          job_role: 'System Engineer',
          department: 'CSE',
          cgpa: 8.9,
          year: 3,
          status: 'rejected',
          applied_at: new Date('2024-01-18'),
          resume_url: '/uploads/resume4.pdf'
        },
        {
          id: 5,
          student_name: 'Vikram Singh',
          email: 'vikram.singh@student.com',
          company_name: 'Infosys',
          job_role: 'Digital Specialist Engineer',
          department: 'MECH',
          cgpa: 7.5,
          year: 2,
          status: 'pending',
          applied_at: new Date('2024-01-19'),
          resume_url: '/uploads/resume5.pdf'
        },
        {
          id: 6,
          student_name: 'Ananya Iyer',
          email: 'ananya.iyer@student.com',
          company_name: 'Google',
          job_role: 'Software Engineer',
          department: 'CSE',
          cgpa: 9.5,
          year: 4,
          status: 'shortlisted',
          applied_at: new Date('2024-01-20'),
          resume_url: '/uploads/resume6.pdf'
        }
      ];
      setApplications(mockApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Update UI immediately (optimistic update)
      setApplications(prev =>
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      );
      
      // Show success message
      setMessage(`✅ Application status updated to "${newStatus}"`);
      setTimeout(() => setMessage(''), 3000);
      
      // Call API in background
      await updateApplicationStatus(id, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      // Revert on error
      fetchApplications();
      setMessage('❌ Failed to update status');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesCompany = companyFilter === 'all' || app.company_name === companyFilter;
    return matchesSearch && matchesStatus && matchesCompany;
  });

  const companies = [...new Set(applications.map(a => a.company_name))];
  const statusCounts = {
    all: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    selected: applications.filter(a => a.status === 'selected').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  if (loading) return <div className="loading">Loading applications...</div>;

  return (
    <div className="applications-view">
      <div className="applications-header">
        <h2>All Applications ({filteredApplications.length})</h2>
      </div>

      {message && <div className="status-message">{message}</div>}

      <div className="status-cards">
        <div className="status-card total">
          <span className="card-icon">📊</span>
          <div>
            <h3>{statusCounts.all}</h3>
            <p>Total Applications</p>
          </div>
        </div>
        <div className="status-card pending">
          <span className="card-icon">⏳</span>
          <div>
            <h3>{statusCounts.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="status-card shortlisted">
          <span className="card-icon">📋</span>
          <div>
            <h3>{statusCounts.shortlisted}</h3>
            <p>Shortlisted</p>
          </div>
        </div>
        <div className="status-card selected">
          <span className="card-icon">✅</span>
          <div>
            <h3>{statusCounts.selected}</h3>
            <p>Selected</p>
          </div>
        </div>
        <div className="status-card rejected">
          <span className="card-icon">❌</span>
          <div>
            <h3>{statusCounts.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <input
          type="text"
          placeholder="🔍 Search by name, email, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>
        
        <select value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)} className="filter-select">
          <option value="all">All Companies</option>
          {companies.map(company => <option key={company} value={company}>{company}</option>)}
        </select>
      </div>

      {filteredApplications.length === 0 ? (
        <p className="no-data">No applications found</p>
      ) : (
        <div className="table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Company</th>
                <th>Role</th>
                <th>Department</th>
                <th>CGPA</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map(app => (
                <tr key={app.id}>
                  <td>
                    <div className="student-info">
                      <strong>{app.student_name}</strong>
                      <span className="email">{app.email}</span>
                    </div>
                  </td>
                  <td><strong>{app.company_name}</strong></td>
                  <td>{app.job_role}</td>
                  <td><span className="dept-badge">{app.department}</span></td>
                  <td><strong>{app.cgpa}</strong></td>
                  <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      className={`status-select ${app.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="selected">Selected</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    <button className="action-btn view" title="View Details">👁️</button>
                    <a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="action-btn download" title="Download Resume">📄</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApplicationsView;
