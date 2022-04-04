const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const { getUserById,
        getAdminById,
        getAllUsers,
        getUser,
        updateUser,
        getUserByAdmin,
        createUserByAdmin,
        updateUserByAdmin,
        deleteUserByAdmin,
        addToCartItems,
        removeFromCartItems,
        checkOutCartItems,
        updateProfileImg } = require('../controllers/user');
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth');

// Params
router.param('userId', getUserById);
router.param('adminId', getAdminById);

// @desc Get User By ID
// @access User (Public)
router.get('/user/:userId', isSignedin, isAuthenticated, getUser);

// @desc Update User by ID
// @access User (Public)
router.put('/user/:userId',
    // Middlewares to check basic validation of mobile number
    [
        check('address.mobile','Mobile number should contains 10 digits').isLength({ min: 10, max: 12 }),
    ], 

    isSignedin, isAuthenticated, updateUser
);

// @desc Update User by ID
// @access User (Public)
router.put('/user/:userId/profileImg',
    isSignedin, isAuthenticated, upload.single('profileImg'), updateProfileImg
);

// @desc Add a Product to CartItems By User
// @access User (Public)
router.put('/user/add/cartItem/:userId', 
    isSignedin, isAuthenticated, addToCartItems
);

// @desc Remove a Product From CartItems By User
// @access User (Public)
router.put('/user/remove/cartItem/:userId', 
    isSignedin, isAuthenticated, removeFromCartItems
);

// @desc Checkout From CartItems By User
// @access User (Public)
router.put('/user/checkout/cartItems/:userId', 
    isSignedin, isAuthenticated, checkOutCartItems
);

//FUNCTIONALITIES BY ADMIN ON USER / CRUD OPERATIONS ON USER THROUGH ADMIN

//@desc Get All Users
//@access ADMIN
router.get('/admin/users/:adminId', 
    isSignedin, isAdmin, getAllUsers
);

// @desc Get User By ID
// @access ADMIN
router.get('/admin/user/:adminId/:usrId', 
    isSignedin, isAdmin, getUserByAdmin
);

// @desc Create User
// @access ADMIN
router.post("/admin/user/:adminId",
	isSignedin, isAdmin,
	[
		check("name", "Name must be more than 2 char").isLength({ min: 2 }),
		check("lastname", "Lastname must be more than 2 char").isLength({
			min: 2,
		}),
		check("email", "Invalid Email").isEmail(),
		check(
			"password",
			"Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character."
		)
			.isLength({ min: 8 })
			.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
	],
	createUserByAdmin
);

// @desc Update User By ID
// @access ADMIN
router.put("/admin/user/:adminId/:usrId",
	isSignedin, isAdmin, updateUserByAdmin
);

// @desc Delete User By ID
// @access ADMIN
router.delete("/admin/user/:adminId/:usrId", 
    isSignedin, isAdmin, deleteUserByAdmin
);


module.exports = router;
