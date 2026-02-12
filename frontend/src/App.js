import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, AuthContext } from './utils/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const GOOGLE_CLIENT_ID = '988873818954-r3369t983idqdqpi5hfta9unpnjih63b.apps.googleusercontent.com';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="loading">Loading...</div>;
  
  if (!user) return <Navigate to="/" />;
  
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} />;
  }
  
  return children;
};

function AppRoutes() {
  const { user } = useContext(AuthContext);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Landing /> : <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} />} />
        <Route path="/admin/login" element={!user ? <Login userType="admin" /> : <Navigate to="/admin/dashboard" />} />
        <Route path="/student/login" element={!user ? <Login userType="student" /> : <Navigate to="/student/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/student/dashboard" />} />
        <Route path="/student/dashboard" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
        <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
