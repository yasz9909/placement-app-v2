const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  const emailPassword = (process.env.EMAIL_PASSWORD || '').replace(/\s/g, '');
  console.log('Email config:', { user: process.env.EMAIL_USER, passLength: emailPassword.length });
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: emailPassword
    }
  });
};

// Send email to single recipient
const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"CampusConnect Placement Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};

// Send email to multiple recipients
const sendBulkEmail = async (recipients, subject, html) => {
  const results = [];
  
  for (const recipient of recipients) {
    const result = await sendEmail(recipient, subject, html);
    results.push({ email: recipient, ...result });
  }
  
  return results;
};

// Send new job notification to all students
const sendNewJobNotification = async (jobData, studentEmails) => {
  const subject = 'New Placement Opportunity Available';
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .job-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .job-details h3 { margin-top: 0; color: #667eea; }
        .detail-row { margin: 10px 0; }
        .detail-label { font-weight: bold; color: #555; }
        .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
        .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 New Placement Opportunity!</h1>
        </div>
        <div class="content">
          <p>Dear Student,</p>
          <p>Great news! A new placement opportunity has been posted on the CampusConnect Placement Portal.</p>
          
          <div class="job-details">
            <h3>📋 Job Details</h3>
            <div class="detail-row">
              <span class="detail-label">Company:</span> ${jobData.company_name}
            </div>
            <div class="detail-row">
              <span class="detail-label">Role:</span> ${jobData.job_role}
            </div>
            <div class="detail-row">
              <span class="detail-label">Location:</span> ${jobData.location}
            </div>
            <div class="detail-row">
              <span class="detail-label">Salary:</span> ${jobData.salary}
            </div>
            <div class="detail-row">
              <span class="detail-label">Minimum CGPA:</span> ${jobData.min_cgpa}
            </div>
            <div class="detail-row">
              <span class="detail-label">Eligible Branches:</span> ${jobData.eligible_branches}
            </div>
            <div class="detail-row">
              <span class="detail-label">Application Deadline:</span> ${new Date(jobData.application_deadline).toLocaleDateString()}
            </div>
          </div>

          <p><strong>📝 Description:</strong></p>
          <p>${jobData.job_description}</p>

          <center>
            <a href="${process.env.FRONTEND_URL}/student/login" class="cta-button">
              🚀 Login to Apply Now
            </a>
          </center>

          <p style="margin-top: 20px; color: #666;">
            <strong>⚡ Quick Tip:</strong> Check your eligibility criteria before applying. The system will automatically verify if you meet the requirements.
          </p>

          <div class="footer">
            <p>This is an automated notification from CampusConnect Placement Portal.</p>
            <p>© 2024 CampusConnect. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  console.log(`Sending job notification to ${studentEmails.length} students...`);
  const results = await sendBulkEmail(studentEmails, subject, html);
  
  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  
  console.log(`Email notification complete: ${successCount} sent, ${failCount} failed`);
  
  return {
    total: studentEmails.length,
    success: successCount,
    failed: failCount,
    results
  };
};

module.exports = {
  sendEmail,
  sendBulkEmail,
  sendNewJobNotification
};
