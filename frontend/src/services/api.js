import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getProfile = () => api.get('/auth/profile');
export const updateProfile = (data) => api.put('/auth/profile', data);
export const getAllStudents = () => api.get('/auth/students');
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) => api.post(`/auth/reset-password/${token}`, { password });

// Job APIs
export const getAllJobs = () => api.get('/jobs');
export const getJobById = (id) => api.get(`/jobs/${id}`);
export const createJob = (data) => api.post('/jobs', data);
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
export const checkEligibility = (id) => api.get(`/jobs/${id}/eligibility`);

// Application APIs
export const applyForJob = (formData) => api.post('/applications', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getMyApplications = () => api.get('/applications/my-applications');
export const getJobApplications = (jobId) => api.get(`/applications/job/${jobId}`);
export const updateApplicationStatus = (id, status) => api.put(`/applications/${id}/status`, { status });

// Placement APIs
export const createPlacement = (data) => api.post('/placements', data);
export const getMyPlacements = () => api.get('/placements/my-placements');
export const getAllPlacements = () => api.get('/placements/all');
export const deletePlacement = (id) => api.delete(`/placements/${id}`);

// Notification APIs
export const getNotifications = () => api.get('/notifications');
export const markNotificationAsRead = (id) => api.put(`/notifications/${id}/read`);
export const markAllNotificationsAsRead = () => api.put('/notifications/mark-all-read');
export const createNotification = (data) => api.post('/notifications', data);

export default api;
