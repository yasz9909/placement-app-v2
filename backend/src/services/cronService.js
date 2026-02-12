const cron = require('node-cron');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Placement = require('../models/Placement');
const User = require('../models/User');
const EmailService = require('./emailService');

class CronService {
  static start() {
    cron.schedule('0 * * * *', async () => {
      console.log('Running placement reminder cron job...');
      
      try {
        const now = new Date();
        const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        // Check job placements
        const upcomingJobs = await Job.find({
          placement_date: {
            $gte: now,
            $lte: next24Hours
          }
        });
        
        for (const job of upcomingJobs) {
          const applications = await Application.find({ job_id: job._id }).populate('student_id');
          const students = applications.map(app => app.student_id);
          
          if (students.length > 0) {
            console.log(`Sending reminders for job: ${job.company_name} to ${students.length} students`);
            const results = await EmailService.sendPlacementReminder(job, students);
            console.log('Email results:', results);
          }
        }
        
        // Check student placements
        const upcomingPlacements = await Placement.find({
          placement_date: {
            $gte: now,
            $lte: next24Hours
          },
          reminder_sent: false
        }).populate('student_id');
        
        for (const placement of upcomingPlacements) {
          if (placement.student_id) {
            console.log(`Sending reminder for placement: ${placement.company_name} to ${placement.student_id.email}`);
            await EmailService.sendStudentPlacementReminder(placement, placement.student_id);
            
            // Mark as sent
            placement.reminder_sent = true;
            await placement.save();
          }
        }
      } catch (error) {
        console.error('Cron job error:', error);
      }
    });

    console.log('Cron job scheduled: Placement reminders will be sent hourly');
  }
}

module.exports = CronService;
