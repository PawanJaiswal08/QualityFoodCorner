const express = require('express');
const router = express.Router();

const upload = require('./../assets/multer')

const { createDeveloper, getAllDevelopers, getDeveloperByID, deleteDeveloper } = require('../controllers/developer');
const { getUserById } = require('../controllers/user');
const { isSignedin, isAdmin } = require('../controllers/auth');

// Params
router.param('userId', getUserById);


// @desc Get All Developers
// @access Public
router.get('/developers', getAllDevelopers);

// @desc Get a Developer
// @access Public
router.get('/developers/:developerId', getDeveloperByID);


// @desc Create a Developer
// @access Admin
router.post('/developers/:userId', isSignedin, isAdmin, upload.single('developerImage'), createDeveloper);

// @desc Delete a Developer
// @access Admin
router.delete('/developers/:developerId/:userId', isSignedin, isAdmin, deleteDeveloper);

module.exports = router;