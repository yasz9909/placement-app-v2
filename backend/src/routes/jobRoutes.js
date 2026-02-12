const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { verifyToken, isAdmin, isStudent } = require('../middleware/auth');

router.post('/', verifyToken, isAdmin, jobController.createJob);
router.get('/', verifyToken, jobController.getAllJobs);
router.get('/:id', verifyToken, jobController.getJobById);
router.put('/:id', verifyToken, isAdmin, jobController.updateJob);
router.delete('/:id', verifyToken, isAdmin, jobController.deleteJob);
router.get('/:id/eligibility', verifyToken, isStudent, jobController.checkEligibility);

module.exports = router;
