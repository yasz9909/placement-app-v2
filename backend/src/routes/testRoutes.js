const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/sendEmail');

router.post('/send-test-email', async (req, res) => {
  try {
    const { to } = req.body;
    const recipient = to || 'yaswanth2420@gmail.com';
    
    console.log('Sending test email to:', recipient);
    console.log('Email config:', { 
      user: process.env.EMAIL_USER, 
      passConfigured: !!process.env.EMAIL_PASSWORD 
    });

    const subject = 'Test Email - CampusConnect Placement Portal';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .success-box { background: #e8f5e9; padding: 20px; border-left: 4px solid #4caf50; margin: 20px 0; border-radius: 4px; }
          .info-box { background: #e3f2fd; padding: 20px; border-left: 4px solid #2196f3; margin: 20px 0; border-radius: 4px; }
          .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Test Email Successful!</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>This is a test email from your <strong>CampusConnect Placement Portal</strong>.</p>
            
            <div class="success-box">
              <h3 style="margin-top: 0; color: #2e7d32;">✅ System Status</h3>
              <p>✅ Email service is working correctly<br>
              ✅ Gmail SMTP connection successful<br>
              ✅ Ready to send placement notifications</p>
            </div>
            
            <div class="info-box">
              <h3 style="margin-top: 0; color: #1976d2;">📧 Email Features</h3>
              <ul style="margin: 10px 0;">
                <li>Automatic notifications when admin posts new jobs</li>
                <li>24-hour placement reminders</li>
                <li>Application status updates</li>
                <li>Professional HTML email templates</li>
              </ul>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              <strong>Sent at:</strong> ${new Date().toLocaleString()}<br>
              <strong>From:</strong> CampusConnect Placement Portal<br>
              <strong>To:</strong> ${recipient}
            </p>

            <div class="footer">
              <p>This is an automated test email from CampusConnect Placement Portal.</p>
              <p>© 2024 CampusConnect. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await sendEmail(recipient, subject, html);
    
    if (result.success) {
      console.log('Test email sent successfully:', result.messageId);
      res.json({ 
        success: true,
        message: `Test email sent successfully to ${recipient}`,
        messageId: result.messageId,
        timestamp: new Date().toISOString()
      });
    } else {
      console.error('Test email failed:', result.error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to send test email',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send test email',
      error: error.message,
      hint: error.message.includes('Invalid login') 
        ? 'Check your EMAIL_USER and EMAIL_PASSWORD in .env file. Use Gmail App Password.'
        : 'Check your email configuration'
    });
  }
});

module.exports = router;
