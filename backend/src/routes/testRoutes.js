const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-test-email', async (req, res) => {
  try {
    const { to } = req.body;
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(400).json({ 
        message: 'Email credentials not configured in .env file',
        instructions: 'Please update EMAIL_USER and EMAIL_PASSWORD in backend/.env'
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to || 'yaswanth2420@gmail.com',
      subject: 'Test Email - Placement Notification System',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">🎉 Test Email Successful!</h2>
          <p>Hello,</p>
          <p>This is a test email from your Placement Notification System.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">System Status:</h3>
            <p>✅ Email service is working correctly</p>
            <p>✅ Gmail SMTP connection successful</p>
            <p>✅ Ready to send placement reminders</p>
          </div>
          
          <div style="background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50; margin: 20px 0;">
            <p style="margin: 0;"><strong>Next Steps:</strong></p>
            <ul style="margin: 10px 0;">
              <li>Add placement details in the app</li>
              <li>Set placement date within 24 hours</li>
              <li>Wait for hourly cron job to run</li>
              <li>Receive automatic reminder email</li>
            </ul>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Sent at: ${new Date().toLocaleString()}<br>
            From: Placement Notification System
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true,
      message: `Test email sent successfully to ${to || 'yaswanth2420@gmail.com'}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send test email',
      error: error.message,
      hint: error.message.includes('Invalid login') 
        ? 'Check your EMAIL_USER and EMAIL_PASSWORD in .env file. Make sure to use Gmail App Password, not regular password.'
        : 'Check your email configuration'
    });
  }
});

module.exports = router;
