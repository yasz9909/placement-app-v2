import React, { useState } from 'react';
import './SettingsView.css';

const SettingsView = ({ user }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [message, setMessage] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@placement.com',
    phone: '+91 9876543210',
    department: 'Placement Cell'
  });

  const [emailSettings, setEmailSettings] = useState({
    emailUser: 'yaswanth2420@gmail.com',
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    enableNotifications: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newJobAlert: true,
    applicationAlert: true,
    placementReminder: true,
    statusChangeAlert: true
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    maxFileSize: '5',
    sessionTimeout: '30'
  });

  const handleSave = (section) => {
    setMessage(`${section} settings saved successfully!`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="settings-view">
      <div className="settings-header">
        <h2>⚙️ Settings</h2>
        <p>Manage your placement portal configuration</p>
      </div>

      {message && <div className="success-message">{message}</div>}

      <div className="settings-layout">
        <div className="settings-sidebar">
          <button 
            className={`settings-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            <span className="nav-icon">👤</span>
            Profile Settings
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'email' ? 'active' : ''}`}
            onClick={() => setActiveSection('email')}
          >
            <span className="nav-icon">📧</span>
            Email Configuration
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSection('notifications')}
          >
            <span className="nav-icon">🔔</span>
            Notifications
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'system' ? 'active' : ''}`}
            onClick={() => setActiveSection('system')}
          >
            <span className="nav-icon">🖥️</span>
            System Settings
          </button>
          <button 
            className={`settings-nav-item ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            <span className="nav-icon">🔒</span>
            Security
          </button>
        </div>

        <div className="settings-content">
          {activeSection === 'profile' && (
            <div className="settings-section">
              <h3>Profile Information</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input 
                  type="text" 
                  value={profileData.department}
                  onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                />
              </div>
              <button className="save-btn" onClick={() => handleSave('Profile')}>
                Save Changes
              </button>
            </div>
          )}

          {activeSection === 'email' && (
            <div className="settings-section">
              <h3>Email Configuration</h3>
              <p className="section-desc">Configure SMTP settings for sending placement notifications</p>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={emailSettings.emailUser}
                  onChange={(e) => setEmailSettings({...emailSettings, emailUser: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>SMTP Host</label>
                <input 
                  type="text" 
                  value={emailSettings.smtpHost}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>SMTP Port</label>
                <input 
                  type="text" 
                  value={emailSettings.smtpPort}
                  onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    checked={emailSettings.enableNotifications}
                    onChange={(e) => setEmailSettings({...emailSettings, enableNotifications: e.target.checked})}
                  />
                  Enable Email Notifications
                </label>
              </div>
              <button className="save-btn" onClick={() => handleSave('Email')}>
                Save Configuration
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="settings-section">
              <h3>Notification Preferences</h3>
              <p className="section-desc">Choose which notifications you want to receive</p>
              <div className="notification-options">
                <div className="notification-item">
                  <div className="notif-info">
                    <span className="notif-icon">💼</span>
                    <div>
                      <h4>New Job Postings</h4>
                      <p>Get notified when a new job is posted</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.newJobAlert}
                      onChange={(e) => setNotificationSettings({...notificationSettings, newJobAlert: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notif-info">
                    <span className="notif-icon">📝</span>
                    <div>
                      <h4>New Applications</h4>
                      <p>Alert when students submit applications</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.applicationAlert}
                      onChange={(e) => setNotificationSettings({...notificationSettings, applicationAlert: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notif-info">
                    <span className="notif-icon">⏰</span>
                    <div>
                      <h4>Placement Reminders</h4>
                      <p>24-hour reminder before placements</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.placementReminder}
                      onChange={(e) => setNotificationSettings({...notificationSettings, placementReminder: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notif-info">
                    <span className="notif-icon">🔄</span>
                    <div>
                      <h4>Status Changes</h4>
                      <p>Notify when application status updates</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.statusChangeAlert}
                      onChange={(e) => setNotificationSettings({...notificationSettings, statusChangeAlert: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              <button className="save-btn" onClick={() => handleSave('Notification')}>
                Save Preferences
              </button>
            </div>
          )}

          {activeSection === 'system' && (
            <div className="settings-section">
              <h3>System Configuration</h3>
              <p className="section-desc">Manage system-wide settings and preferences</p>
              <div className="system-options">
                <div className="system-item">
                  <div>
                    <h4>🔧 Maintenance Mode</h4>
                    <p>Temporarily disable student access</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={systemSettings.maintenanceMode}
                      onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="system-item">
                  <div>
                    <h4>👥 Allow Student Registration</h4>
                    <p>Enable new student sign-ups</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={systemSettings.allowRegistration}
                      onChange={(e) => setSystemSettings({...systemSettings, allowRegistration: e.target.checked})}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Maximum File Upload Size (MB)</label>
                <input 
                  type="number" 
                  value={systemSettings.maxFileSize}
                  onChange={(e) => setSystemSettings({...systemSettings, maxFileSize: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Session Timeout (minutes)</label>
                <input 
                  type="number" 
                  value={systemSettings.sessionTimeout}
                  onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: e.target.value})}
                />
              </div>
              <button className="save-btn" onClick={() => handleSave('System')}>
                Save Settings
              </button>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="settings-section">
              <h3>Security Settings</h3>
              <p className="section-desc">Manage password and security preferences</p>
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
              <button className="save-btn" onClick={() => handleSave('Password')}>
                Update Password
              </button>
              
              <div className="security-info">
                <h4>🔐 Two-Factor Authentication</h4>
                <p>Add an extra layer of security to your account</p>
                <button className="secondary-btn">Enable 2FA</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
