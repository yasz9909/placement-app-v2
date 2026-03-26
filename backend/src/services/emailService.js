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
    const interviewDate = new Date(placement.placement_date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const interviewTime = new Date(placement.placement_date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: `⏰ Interview Tomorrow: ${placement.company_name} - ${placement.job_role || 'Placement Drive'}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:30px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:linear-gradient(135deg,#f093fb,#f5576c);border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
        <div style="font-size:48px;margin-bottom:10px;">⏰</div>
        <h1 style="color:white;margin:0;font-size:26px;font-weight:800;">Interview Tomorrow!</h1>
        <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:15px;">Your placement reminder from CampusConnect</p>
      </td></tr>

      <!-- Body -->
      <tr><td style="background:white;padding:36px 40px;">
        <p style="font-size:16px;color:#333;margin:0 0 6px;">Hi <strong>${student.name}</strong> 👋</p>
        <p style="font-size:15px;color:#555;margin:0 0 28px;">You registered for a placement drive at <strong>${placement.company_name}</strong>. Your interview is scheduled for <strong>tomorrow</strong>. Here's everything you need to know:</p>

        <!-- Company Banner -->
        <div style="background:linear-gradient(135deg,#f093fb15,#f5576c15);border:2px solid #f5576c30;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
          <h2 style="margin:0 0 4px;color:#f5576c;font-size:22px;">${placement.company_name}</h2>
          <p style="margin:0;color:#c0392b;font-size:16px;font-weight:600;">📌 ${placement.job_role || 'Placement Drive'}</p>
        </div>

        <!-- Details Grid -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td width="50%" style="padding:0 8px 12px 0;vertical-align:top;">
              <div style="background:#f8f9ff;border-radius:8px;padding:14px;">
                <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">📅 Interview Date</div>
                <div style="font-size:14px;font-weight:700;color:#333;">${interviewDate}</div>
              </div>
            </td>
            <td width="50%" style="padding:0 0 12px 8px;vertical-align:top;">
              <div style="background:#fff3f3;border-radius:8px;padding:14px;border:1px solid #ffcccc;">
                <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">🕐 Time</div>
                <div style="font-size:14px;font-weight:700;color:#e53935;">${interviewTime}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding:0 0 12px 0;vertical-align:top;">
              <div style="background:#f8f9ff;border-radius:8px;padding:14px;">
                <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">📍 Venue</div>
                <div style="font-size:14px;font-weight:700;color:#333;">${placement.venue_details}</div>
              </div>
            </td>
          </tr>
        </table>

        ${placement.additional_notes ? `
        <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:10px;padding:14px 18px;margin-bottom:20px;">
          <p style="margin:0;font-size:14px;color:#555;">📝 <strong>Notes:</strong> ${placement.additional_notes}</p>
        </div>` : ''}

        <!-- Preparation Checklist -->
        <div style="background:#f0fff4;border:1px solid #b2dfdb;border-radius:10px;padding:18px 20px;margin-bottom:24px;">
          <h3 style="margin:0 0 12px;color:#2e7d32;font-size:15px;">✅ Pre-Interview Checklist</h3>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:4px 0;font-size:14px;color:#444;">📄 Print multiple copies of your resume</td></tr>
            <tr><td style="padding:4px 0;font-size:14px;color:#444;">🪪 Carry your College ID and Aadhar card</td></tr>
            <tr><td style="padding:4px 0;font-size:14px;color:#444;">📸 Bring passport size photographs</td></tr>
            <tr><td style="padding:4px 0;font-size:14px;color:#444;">👔 Dress professionally (formal attire)</td></tr>
            <tr><td style="padding:4px 0;font-size:14px;color:#444;">⏰ Arrive at least 15 minutes early</td></tr>
            <tr><td style="padding:4px 0;font-size:14px;color:#444;">💻 Carry laptop if technical round is expected</td></tr>
          </table>
        </div>

        <!-- Motivation -->
        <div style="background:linear-gradient(135deg,#667eea15,#764ba215);border-left:4px solid #667eea;border-radius:0 8px 8px 0;padding:16px 18px;margin-bottom:24px;">
          <p style="margin:0;font-size:14px;color:#444;line-height:1.7;">💪 <strong>You've got this!</strong> You registered for this opportunity because you believed in yourself. Stay confident, be yourself, and give it your best shot. Good luck! 🌟</p>
        </div>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f8f9ff;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
        <p style="margin:0 0 4px;font-size:13px;color:#888;">This reminder was sent by <strong>CampusConnect Placement Portal</strong>.</p>
        <p style="margin:0;font-size:12px;color:#bbb;">© 2024 CampusConnect. All rights reserved.</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
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
