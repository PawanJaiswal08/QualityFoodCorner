const express = require('express');
const router = express.Router();

const {  getStoreById, getAllStores, createStore, updateStore, deleteStore } = require('../controllers/store');
const { getUserById } = require('../controllers/user');
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth');

// Params
router.param('userId', getUserById);
router.param('storeId', getStoreById);

// @desc Get All Stores
// @access Public
router.get('/stores', getAllStores);

// @desc Create a Store
// @access Admin
router.post('/store/:userId', isSignedin, isAuthenticated, isAdmin, createStore);

// @desc Update a Store
// @access Admin
router.put('/store/:storeId/:userId', isSignedin, isAuthenticated, isAdmin, updateStore);

// @desc Delete a Store
// @access Admin
router.delete('/store/:storeId/:userId', isSignedin, isAuthenticated, isAdmin, deleteStore);

module.exports = router;
