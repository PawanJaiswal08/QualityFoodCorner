const express = require("express");
const router = express.Router();
const { check } = require('express-validator');

const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category");
const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");


// Params
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

// @desc Get All Categories
// @access Public
router.get('/categories', getAllCategory);

// @desc Get Category By Id or Name
// @access Public
router.get('/category/:category', getCategory);


// @desc Create a Category
// @access Admin
router.post('/category/:userId',
    [
      check('name','Category name is empty').isLength({ min: 1 }), 
    ],
    isSignedin, isAuthenticated, isAdmin, createCategory
);

// @desc Update a Category
// @access Admin
router.put('/category/:categoryId/:userId',
	[
		check('name','Category name is empty').isLength({ min: 1 }), 
	],
	isSignedin, isAuthenticated, isAdmin, updateCategory
);

// @desc Delete a Category
// @access Admin
router.delete('/category/:categoryId/:userId', 
	isSignedin, isAuthenticated, isAdmin, deleteCategory
);

module.exports = router;
