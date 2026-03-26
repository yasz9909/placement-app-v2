import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ role, activeTab, onTabChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const adminMenuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'jobs', icon: '💼', label: 'Manage Jobs' },
    { id: 'students', icon: '👥', label: 'Students' },
    { id: 'applications', icon: '📄', label: 'Applications' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  const studentMenuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'jobs', icon: '💼', label: 'Available Jobs' },
    { id: 'applications', icon: '📝', label: 'My Applications' },
    { id: 'placements', icon: '📅', label: 'My Placements' },
    { id: 'profile', icon: '👤', label: 'Profile' }
  ];

  const menuItems = role === 'admin' ? adminMenuItems : studentMenuItems;

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">Placement Portal</span>
          </div>
        )}
        <button 
          className="collapse-btn" 
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '»' : '«'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
            title={collapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
            {activeTab === item.id && <span className="active-indicator"></span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className={`user-info ${collapsed ? 'collapsed' : ''}`}>
          <div className="user-avatar">
            {role === 'admin' ? '👨‍💼' : '👨‍🎓'}
          </div>
          {!collapsed && (
            <div className="user-details">
              <span className="user-role">{role === 'admin' ? 'Admin' : 'Student'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
