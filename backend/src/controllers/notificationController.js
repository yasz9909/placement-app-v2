// const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Mock notifications for now
    const mockNotifications = [
      {
        id: 1,
        user_id: userId,
        type: 'new_job',
        title: 'New Job Posted',
        message: 'Google is hiring for Software Engineer role',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        icon: '💼',
        link: '/jobs'
      },
      {
        id: 2,
        user_id: userId,
        type: 'placement_reminder',
        title: 'Placement Reminder',
        message: 'Microsoft placement drive tomorrow at 10:00 AM',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        read: false,
        icon: '⏰',
        link: '/placements'
      },
      {
        id: 3,
        user_id: userId,
        type: 'status_change',
        title: 'Application Status Updated',
        message: 'Your application for Amazon has been shortlisted',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
        icon: '✅',
        link: '/applications'
      },
      {
        id: 4,
        user_id: userId,
        type: 'new_job',
        title: 'New Job Posted',
        message: 'TCS is hiring for Multiple Roles',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        read: true,
        icon: '💼',
        link: '/jobs'
      }
    ];

    res.json({
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter(n => !n.read).length
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    
    // In real implementation, update database
    res.json({ message: 'Notification marked as read', notificationId });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // In real implementation, update all user notifications
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { userId, type, title, message, icon, link } = req.body;
    
    // Mock notification creation
    const notification = {
      id: Date.now(),
      user_id: userId,
      type,
      title,
      message,
      icon: icon || '🔔',
      link: link || '/',
      timestamp: new Date(),
      read: false
    };

    res.status(201).json({ 
      message: 'Notification created',
      notification 
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper function to create notifications for all students when new job is posted
exports.notifyNewJob = async (jobData) => {
  try {
    // In real implementation, create notifications for all eligible students
    console.log('Creating notifications for new job:', jobData.company_name);
  } catch (error) {
    console.error('Notify new job error:', error);
  }
};

// Helper function to notify student when application status changes
exports.notifyStatusChange = async (applicationId, newStatus) => {
  try {
    // In real implementation, create notification for specific student
    console.log('Notifying status change:', applicationId, newStatus);
  } catch (error) {
    console.error('Notify status change error:', error);
  }
};
