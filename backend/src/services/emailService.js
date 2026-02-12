const nodemailer = require('nodemailer');
const Notification = require('../models/Notification');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

class EmailService {
  static async sendPlacementReminder(job, students) {
    const results = [];
    
    for (const student of students) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: student.email,
        subject: `Reminder: Placement Drive Tomorrow - ${job.company_name}`,
        html: `
          <h2>Placement Drive Reminder</h2>
          <p>Dear ${student.name},</p>
          <p>This is a reminder that you have a placement drive scheduled within the next 24 hours.</p>
          <h3>Details:</h3>
          <ul>
            <li><strong>Company:</strong> ${job.company_name}</li>
            <li><strong>Role:</strong> ${job.job_role}</li>
            <li><strong>Date & Time:</strong> ${new Date(job.placement_date).toLocaleString()}</li>
            <li><strong>Location:</strong> ${job.location || 'TBA'}</li>
          </ul>
          <h3>Eligibility Criteria:</h3>
          <ul>
            ${job.min_cgpa ? `<li>Minimum CGPA: ${job.min_cgpa}</li>` : ''}
            ${job.eligible_branches ? `<li>Eligible Branches: ${job.eligible_branches}</li>` : ''}
            ${job.eligible_years ? `<li>Eligible Years: ${job.eligible_years}</li>` : ''}
          </ul>
          <p><strong>Please be on time and bring all required documents.</strong></p>
          <p>Best of luck!</p>
          <p>Regards,<br>Placement Cell</p>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        await Notification.create({
          job_id: job._id,
          student_id: student._id,
          email: student.email,
          subject: mailOptions.subject,
          message: mailOptions.html,
          status: 'sent'
        });
        results.push({ email: student.email, status: 'sent' });
      } catch (error) {
        await Notification.create({
          job_id: job._id,
          student_id: student._id,
          email: student.email,
          subject: mailOptions.subject,
          message: mailOptions.html,
          status: 'failed'
        });
        results.push({ email: student.email, status: 'failed', error: error.message });
      }
    }
    
    return results;
  }

  static async sendApplicationConfirmation(student, job) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: `Application Received - ${job.company_name}`,
      html: `
        <h2>Application Confirmation</h2>
        <p>Dear ${student.name},</p>
        <p>Your application for <strong>${job.job_role}</strong> at <strong>${job.company_name}</strong> has been received successfully.</p>
        <p><strong>Placement Date:</strong> ${new Date(job.placement_date).toLocaleString()}</p>
        <p>We will notify you about further updates.</p>
        <p>Best regards,<br>Placement Cell</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  }

  static async sendStudentPlacementReminder(placement, student) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: `Reminder: Placement Tomorrow - ${placement.company_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #667eea;">Placement Reminder</h2>
          <p>Dear ${student.name},</p>
          <p>This is a reminder that you have a placement scheduled within the next 24 hours.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Placement Details:</h3>
            <p><strong>Company:</strong> ${placement.company_name}</p>
            <p><strong>Date & Time:</strong> ${new Date(placement.placement_date).toLocaleString()}</p>
            <p><strong>Timing:</strong> ${placement.timing}</p>
            <p><strong>Venue:</strong> ${placement.venue_details}</p>
            ${placement.additional_notes ? `<p><strong>Notes:</strong> ${placement.additional_notes}</p>` : ''}
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
            <p style="margin: 0;"><strong>⚠️ Important Reminders:</strong></p>
            <ul style="margin: 10px 0;">
              <li>Arrive 15 minutes early</li>
              <li>Bring all required documents</li>
              <li>Dress professionally</li>
              <li>Carry multiple copies of your resume</li>
            </ul>
          </div>
          
          <p>Best of luck with your placement!</p>
          <p style="color: #666; font-size: 14px;">Regards,<br>Placement Cell</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Reminder sent to ${student.email} for ${placement.company_name}`);
      return { success: true };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = EmailService;
