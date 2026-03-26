const nodemailer = require('nodemailer');

const createTransporter = () => {
  const emailPassword = (process.env.EMAIL_PASSWORD || '').replace(/\s/g, '');
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: emailPassword }
  });
};

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `"CampusConnect Placement Portal" <${process.env.EMAIL_USER}>`,
      to, subject, html
    });
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};

const sendBulkEmail = async (recipients, subject, getHtml) => {
  const results = [];
  for (const recipient of recipients) {
    const html = typeof getHtml === 'function' ? getHtml(recipient) : getHtml;
    const result = await sendEmail(recipient.email || recipient, subject, html);
    results.push({ email: recipient.email || recipient, ...result });
  }
  return results;
};

const buildJobEmailHtml = (job, student) => {
  const applyUrl = `${process.env.FRONTEND_URL}/student/login`;
  const deadline = new Date(job.application_deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const placementDate = new Date(job.placement_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const studentName = student.name || 'Student';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Placement Opportunity</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f5;padding:30px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:linear-gradient(135deg,#667eea,#764ba2);border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
        <div style="font-size:40px;margin-bottom:10px;">🎓</div>
        <h1 style="color:white;margin:0;font-size:26px;font-weight:800;">New Placement Opportunity!</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:15px;">CampusConnect Placement Portal</p>
      </td></tr>

      <!-- Body -->
      <tr><td style="background:white;padding:36px 40px;">
        <p style="font-size:16px;color:#333;margin:0 0 6px;">Hi <strong>${studentName}</strong> 👋</p>
        <p style="font-size:15px;color:#555;margin:0 0 28px;">A new placement drive has been posted. Check if you're eligible and apply before the deadline!</p>

        <!-- Company Banner -->
        <div style="background:linear-gradient(135deg,#667eea15,#764ba215);border:2px solid #667eea30;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
          <h2 style="margin:0 0 4px;color:#667eea;font-size:22px;">${job.company_name}</h2>
          <p style="margin:0;color:#764ba2;font-size:16px;font-weight:600;">📌 ${job.job_role}</p>
        </div>

        <!-- Job Details Grid -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td width="50%" style="padding:0 8px 12px 0;vertical-align:top;">
              <div style="background:#f8f9ff;border-radius:8px;padding:14px;">
                <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">💰 Package</div>
                <div style="font-size:15px;font-weight:700;color:#333;">${job.salary || 'Not disclosed'}</div>
              </div>
            </td>
            <td width="50%" style="padding:0 0 12px 8px;vertical-align:top;">
              <div style="background:#f8f9ff;border-radius:8px;padding:14px;">
                <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">📍 Location</div>
                <div style="font-size:15px;font-weight:700;color:#333;">${job.location || 'TBA'}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td width="50%" style="padding:0 8px 12px 0;vertical-align:top;">
              <div style="background:#f8f9ff;border-radius:8px;padding:14px;">
                <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">📅 Placement Date</div>
                <div style="font-size:15px;font-weight:700;color:#333;">${placementDate}</div>
              </div>
            </td>
            <td width="50%" style="padding:0 0 12px 8px;vertical-align:top;">
              <div style="background:#fff3f3;border-radius:8px;padding:14px;border:1px solid #ffcccc;">
                <div style="font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">⏰ Apply By</div>
                <div style="font-size:15px;font-weight:700;color:#e53935;">${deadline}</div>
              </div>
            </td>
          </tr>
        </table>

        <!-- Description -->
        <div style="margin-bottom:20px;">
          <h3 style="margin:0 0 8px;color:#333;font-size:15px;">📝 Job Description</h3>
          <p style="margin:0;color:#555;font-size:14px;line-height:1.7;background:#f9f9f9;padding:14px;border-radius:8px;">${job.job_description}</p>
        </div>

        <!-- Eligibility -->
        <div style="background:#f0fff4;border:1px solid #b2dfdb;border-radius:10px;padding:18px 20px;margin-bottom:20px;">
          <h3 style="margin:0 0 12px;color:#2e7d32;font-size:15px;">✅ Eligibility Criteria</h3>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:4px 0;font-size:14px;color:#444;">🎓 <strong>Min CGPA:</strong> ${job.min_cgpa || 'No minimum'}</td></tr>
            <tr><td style="padding:4px 0;font-size:14px;color:#444;">🏛️ <strong>Eligible Branches:</strong> ${job.eligible_branches || 'All branches'}</td></tr>
            <tr><td style="padding:4px 0;font-size:14px;color:#444;">📆 <strong>Eligible Years:</strong> ${job.eligible_years || 'All years'}</td></tr>
            ${job.required_skills ? `<tr><td style="padding:4px 0;font-size:14px;color:#444;">💡 <strong>Required Skills:</strong> ${job.required_skills}</td></tr>` : ''}
          </table>
        </div>

        <!-- Required Documents -->
        <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:10px;padding:16px 20px;margin-bottom:28px;">
          <h3 style="margin:0 0 10px;color:#f57f17;font-size:15px;">📁 Required Documents</h3>
          <ul style="margin:0;padding-left:20px;color:#555;font-size:14px;line-height:1.8;">
            <li>Updated Resume (PDF)</li>
            <li>College ID Card</li>
            <li>Latest Marksheets / Transcripts</li>
            <li>Passport size photographs</li>
          </ul>
        </div>

        <!-- CTA Button -->
        <div style="text-align:center;margin-bottom:24px;">
          <a href="${applyUrl}" style="display:inline-block;background:linear-gradient(135deg,#667eea,#764ba2);color:white;text-decoration:none;padding:16px 48px;border-radius:50px;font-size:16px;font-weight:800;letter-spacing:0.5px;box-shadow:0 4px 15px rgba(102,126,234,0.4);">🚀 Apply Now</a>
          <p style="margin:12px 0 0;font-size:12px;color:#999;">Login to the portal and apply before the deadline</p>
        </div>

        <!-- Tips -->
        <div style="background:#f3f0ff;border-left:4px solid #667eea;border-radius:0 8px 8px 0;padding:14px 16px;">
          <p style="margin:0;font-size:13px;color:#555;">⚡ <strong>Pro Tip:</strong> The portal automatically checks your eligibility. Make sure your profile (CGPA, branch, year) is up to date before applying.</p>
        </div>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#f8f9ff;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
        <p style="margin:0 0 4px;font-size:13px;color:#888;">This is an automated notification from <strong>CampusConnect Placement Portal</strong>.</p>
        <p style="margin:0;font-size:12px;color:#bbb;">© 2024 CampusConnect. All rights reserved.</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
};

const sendNewJobNotification = async (jobData, students) => {
  const subject = `🚀 New Placement Drive: ${jobData.company_name} - ${jobData.job_role}`;

  // Support both array of emails (strings) and array of student objects
  const studentList = students.map(s => typeof s === 'string' ? { email: s, name: 'Student' } : s);

  console.log(`Sending job notification to ${studentList.length} students...`);
  const results = await sendBulkEmail(studentList, subject, (student) => buildJobEmailHtml(jobData, student));

  const successCount = results.filter(r => r.success).length;
  const failCount = results.filter(r => !r.success).length;
  console.log(`Email notification complete: ${successCount} sent, ${failCount} failed`);

  return { total: studentList.length, success: successCount, failed: failCount, results };
};

module.exports = { sendEmail, sendBulkEmail, sendNewJobNotification };
