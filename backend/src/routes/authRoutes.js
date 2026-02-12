const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);
router.get('/profile', verifyToken, authController.getProfile);
router.put('/profile', verifyToken, authController.updateProfile);
router.get('/students', verifyToken, isAdmin, authController.getAllStudents);

module.exports = router;
