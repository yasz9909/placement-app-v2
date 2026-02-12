const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { verifyToken, isAdmin, isStudent } = require('../middleware/auth');
const upload = require('../utils/fileUpload');

router.post('/', verifyToken, isStudent, upload.single('resume'), applicationController.applyForJob);
router.get('/my-applications', verifyToken, isStudent, applicationController.getMyApplications);
router.get('/job/:jobId', verifyToken, isAdmin, applicationController.getJobApplications);
router.put('/:id/status', verifyToken, isAdmin, applicationController.updateApplicationStatus);

module.exports = router;
