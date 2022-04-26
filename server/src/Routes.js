// Routes
const bannerRoutes = require('./../routes/banner');
const authRoutes = require('./../routes/auth');
const userRoutes = require('./../routes/user');
const categoryRoutes = require('./../routes/category');
const productRoutes = require('./../routes/product');
const storeRoutes = require('./../routes/store');
const offerRoutes = require('./../routes/offer');
const developerRoutes = require('./../routes/developer');
const csvRoutes = require('./../routes/csv');
const payment = require('./../routes/payment')

const Routes = [
    bannerRoutes,
    authRoutes, 
    userRoutes, 
    categoryRoutes, 
    productRoutes, 
    storeRoutes, 
    offerRoutes,
    developerRoutes,
    csvRoutes,
    payment
]

module.exports = Routes
