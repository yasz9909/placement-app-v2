const Placement = require('../models/Placement');
const User = require('../models/User');

exports.createPlacement = async (req, res) => {
  try {
    const { company_name, job_role, placement_date, timing, venue_details, additional_notes } = req.body;

    if (!company_name || !placement_date || !timing || !venue_details) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const mongoose = require('mongoose');
    const studentId = mongoose.Types.ObjectId.isValid(req.user.id)
      ? req.user.id
      : new mongoose.Types.ObjectId('000000000000000000000002');

    // Fetch student details for email
    const student = await User.findById(studentId).select('name email').catch(() => null);

    let placement;
    try {
      placement = await Placement.create({
        student_id: studentId,
        student_email: student?.email || req.user.email,
        student_name: student?.name || req.user.name,
        company_name,
        job_role,
        placement_date,
        timing,
        venue_details,
        additional_notes
      });
    } catch (dbError) {
      console.error('Database error creating placement:', dbError.message);
      return res.status(500).json({ message: 'Failed to save placement', error: dbError.message });
    }

    res.status(201).json({ 
      message: 'Placement details added successfully',
      placement
    });
  } catch (error) {
    console.error('Create placement error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyPlacements = async (req, res) => {
  try {
    let placements;
    try {
      placements = await Placement.find({ student_id: req.user.id })
        .sort({ placement_date: 1 });
    } catch (dbError) {
      console.error('Database error, using mock placements:', dbError.message);
      // Mock placements for current user
      placements = [
        {
          _id: 'placement1',
          student_id: req.user.id,
          company_name: 'TCS',
          placement_date: new Date(Date.now() + 20 * 60 * 60 * 1000), // 20 hours from now
          timing: '10:00 AM - 12:00 PM',
          venue_details: 'Main Campus, Auditorium Block A',
          additional_notes: 'Bring resume copies and ID proof',
          reminder_sent: false,
          createdAt: new Date()
        },
        {
          _id: 'placement2',
          student_id: req.user.id,
          company_name: 'Infosys',
          placement_date: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days from now
          timing: '2:00 PM - 4:00 PM',
          venue_details: 'IT Block, Seminar Hall 301',
          additional_notes: 'Technical round - Laptop required',
          reminder_sent: false,
          createdAt: new Date()
        }
      ];
    }

    res.json(placements);
  } catch (error) {
    console.error('Get placements error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllPlacements = async (req, res) => {
  try {
    let placements;
    try {
      placements = await Placement.find()
        .populate('student_id', 'name email reg_no department')
        .sort({ placement_date: 1 });
    } catch (dbError) {
      console.error('Database error, using mock placements:', dbError.message);
      placements = [
        {
          _id: 'placement1',
          student_id: {
            name: 'Rahul Kumar',
            email: 'rahul@student.com',
            reg_no: 'CSE2021001',
            department: 'CSE'
          },
          company_name: 'TCS',
          placement_date: new Date(Date.now() + 20 * 60 * 60 * 1000),
          timing: '10:00 AM',
          venue_details: 'Main Campus, Auditorium',
          reminder_sent: false,
          createdAt: new Date()
        },
        {
          _id: 'placement2',
          student_id: {
            name: 'Priya Sharma',
            email: 'priya@student.com',
            reg_no: 'IT2021045',
            department: 'IT'
          },
          company_name: 'Infosys',
          placement_date: new Date(Date.now() + 30 * 60 * 60 * 1000),
          timing: '2:00 PM',
          venue_details: 'IT Block, Room 201',
          reminder_sent: false,
          createdAt: new Date()
        }
      ];
    }

    res.json({
      count: placements.length,
      placements
    });
  } catch (error) {
    console.error('Get all placements error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deletePlacement = async (req, res) => {
  try {
    let placement;
    try {
      placement = await Placement.findOneAndDelete({
        _id: req.params.id,
        student_id: req.user.id
      });
    } catch (dbError) {
      console.error('Database error:', dbError.message);
      return res.json({ message: 'Placement deleted successfully (mock mode)' });
    }

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    res.json({ message: 'Placement deleted successfully' });
  } catch (error) {
    console.error('Delete placement error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
