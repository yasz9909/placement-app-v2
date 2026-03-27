const cron = require('node-cron');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Placement = require('../models/Placement');
const User = require('../models/User');
const EmailService = require('./emailService');

class CronService {
  static async runNow() {
    console.log('Running placement reminder check...');
    try {
      const now = new Date();
      const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000); // 30hr window to handle timezone gaps

      // Check job placements
      const upcomingJobs = await Job.find({
        placement_date: { $gte: now, $lte: next24Hours }
      });

      for (const job of upcomingJobs) {
        const applications = await Application.find({ job_id: job._id }).populate('student_id');
        const students = applications.map(app => app.student_id);
        if (students.length > 0) {
          console.log(`Sending reminders for job: ${job.company_name} to ${students.length} students`);
          await EmailService.sendPlacementReminder(job, students);
        }
      }

      // Check student placements
      const upcomingPlacements = await Placement.find({
        placement_date: { $gte: now, $lte: next24Hours },
        reminder_sent: false
      }).populate('student_id', 'name email');

      for (const placement of upcomingPlacements) {
        let student = placement.student_id;

        // If populate failed, fetch student manually
        if (!student && placement.student_id) {
          student = await User.findById(placement.student_id).select('name email');
        }

        // Final fallback: use stored email on placement
        if (!student && placement.student_email) {
          student = { name: placement.student_name || 'Student', email: placement.student_email };
        }

        if (student && student.email) {
          console.log(`Sending reminder: ${placement.company_name} → ${student.email}`);
          await EmailService.sendStudentPlacementReminder(placement, student);
          placement.reminder_sent = true;
          await placement.save();
        } else {
          console.log(`Skipping placement ${placement._id} - no student email found`);
        }
      }

      console.log(`Checked ${upcomingJobs.length} jobs, ${upcomingPlacements.length} placements`);
    } catch (error) {
      console.error('Cron job error:', error);
    }
  }

  static start() {
    cron.schedule('*/15 * * * *', () => CronService.runNow());
    console.log('Cron job scheduled: Placement reminders will be sent every 15 minutes');
  }
}

module.exports = CronService;
