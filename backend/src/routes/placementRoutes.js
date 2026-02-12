const express = require('express');
const router = express.Router();
const placementController = require('../controllers/placementController');
const { verifyToken, isAdmin, isStudent } = require('../middleware/auth');

router.post('/', verifyToken, isStudent, placementController.createPlacement);
router.get('/my-placements', verifyToken, isStudent, placementController.getMyPlacements);
router.get('/all', verifyToken, isAdmin, placementController.getAllPlacements);
router.delete('/:id', verifyToken, isStudent, placementController.deletePlacement);

module.exports = router;
