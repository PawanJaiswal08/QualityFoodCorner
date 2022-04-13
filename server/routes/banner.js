const express = require("express");
const router = express.Router();
const { check } = require('express-validator');

const { getBannerById, getBanner, createBanner, updateBannerDetails, deleteBanner } = require('../controllers/banner')
const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require('../controllers/user');

// Params
router.param('userId', getUserById);
router.param('bannerId', getBannerById);


// @desc Get User By ID
// @access User (Public)
router.get('/banner/:bannerId', getBannerById, getBanner);

// @desc Create a Banner
// @access Admin
router.post(
    '/banner/:userId', isSignedin, isAuthenticated, isAdmin, createBanner
);

// @desc Update Banner
// @access Admin
router.put(
	'/banner/:bannerId/:userId', isSignedin, isAuthenticated, isAdmin, getBannerById, updateBannerDetails
);

// @desc Delete Banner
// @access Admin
router.delete(
	'/banner/:bannerId/:userId', isSignedin, isAuthenticated, isAdmin, getBannerById, deleteBanner
);

module.exports = router;