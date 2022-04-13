const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/user');
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getCategoryByName } = require('../controllers/category')
const { createProduct, getProduct, updateProduct, deleteProduct, getAllProducts, getAllProductsByCategory, getAllUniqueCategories, getSearchedProducts } = require('../controllers/product');

// Params
router.param('userId', getUserById);
router.param('categoryName', getCategoryByName);


// @desc Get Products searched by title
// @access Public
router.get('/product/search/:title', getSearchedProducts);

// @desc Get All Products By Category
// @access Public
router.get('/products/:categoryName', getAllProductsByCategory);

// @desc Get All Unique Categories (Min. 1 Product)
// @access Public
router.get('/products/all/categories', getAllUniqueCategories)


// @desc Get All Products
// @access Public
router.get('/products', getAllProducts);

// @desc Get Product
// @access Public
router.get('/product/:product', getProduct);

// @desc Create a Product
// @access Admin
router.post('/product/:userId', isSignedin, isAuthenticated, isAdmin, createProduct);

// @desc Update a Product
// @access Admin
router.put('/product/:productId/:userId', isSignedin, isAuthenticated, isAdmin, updateProduct);

// @desc Delete a Product
// @access Admin
router.delete('/product/:productId/:userId', isSignedin, isAuthenticated, isAdmin, deleteProduct);

module.exports = router;
