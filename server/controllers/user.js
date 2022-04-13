const User = require('../models/user');
const { validationResult } = require('express-validator');

const fs = require('fs');
const { uploadFile, getFileStream } = require('./../assets/s3')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

// @desc Get User By ID
// @route GET /api/user/:userId
// @access Public
exports.getUserById = async (req, res, next, id) => {

    try {

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                error: "NO user found in database"
            });
        }

        req.profile = user;
        next();
        
    } catch (error) {
        return res.status(400).json({
            error: "NO user found in database"
        });
    }
};

// @desc Get Admin By ID
// @route GET /api/user/:adminId
// @access Admin
exports.getAdminById = async (req, res, next, id) => {
    
    try {

        const admin = await User.find({id: id, role:1});

        if (!admin) {
            return res.status(400).json({
                error: "NO Admin found in database by Id"
            });
        }

        req.profile = admin;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "NO Admin found in database"
        });
    }
}

// @desc Get User By Admin Credentials
// @route GET /api/admin/user/:adminId
// @access Admin
exports.getUserByAdmin = async (req, res) => {

    try {

        const userIdToBeFound = req.params.usrId

        const user = await User.findById(userIdToBeFound);

        if (!user) {
            return res.status(400).json({
                error: "NO Admin found in database"
            });
        }

        return res.json(user)
        
    } catch (error) {
        return res.status(400).json({
            error: "NO user found in database"
        });
    }
}

// @desc Get a User
// @route GET /api/user/:userId
// @access Public
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		if (users) {
			return res.json({ users: users });
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "No users found" });
	}
};

// @desc Update a User
// @route PUT /api/user/:userId
// @access Admin
exports.updateUser = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                error: errors.array()[0].msg
            });
        }

        const user = await User.findByIdAndUpdate(
            {_id: req.profile._id},
            {$set: req.body},
            {new:true, useFindAndModify:false},
        );

        user.salt = undefined;
        user.encry_password = undefined;
        
        return res.status(200).json(user)

    } catch (error) {

        return res.status(400).json({
            error: "You are not allowed to update this info"
        });
    }
};

// @desc Add a Product to CartItems
// @route PUT /api/user/add/cartItem/:userId
// @access Public
exports.addToCartItems = async (req, res) => {

    try {

        const user = await User.findById(req.profile._id);

        user.cartItems.push(req.body.productId)

        user.save()

        return res.status(200).json({
            success : "Added Cart Item"
        });


    } catch (error) {

        return res.status(400).json({
            error: "You are not allowed to update this info"
        });
    }
};

// @desc Remove a Product to CartItems
// @route PUT /api/user/remove/cartItem/:userId
// @access Public
exports.removeFromCartItems = async (req, res) => {
    
    try {

        const user = await User.findById(req.profile._id);

        var index = user.cartItems.indexOf(req.body.productId);

        if (index !== -1) {
            user.cartItems.splice(index, 1);
        }

        if (index == -1) {
            return res.status(400).json({
                success : "This Item is not present in the Cart"
            });
        }

        user.save()

        return res.status(200).json({
            success : "Remove from CartItems"
        });


    } catch (error) {

        return res.status(400).json({
            error: "You are not allowed to update this info"
        });
    }
}

// @desc CheckOut CartItems
// @route PUT /api/user/remove/cartItem/:userId
// @access Public
exports.checkOutCartItems = async (req, res) => {
    
    try {

        const user = await User.findById(req.profile._id);

        if (user.cartItems.length === 0) {

            user.save()

            return res.status(400).json({
                error:"Cart Items is empty"
            })
        }

        var x = user.cartItems.slice()

        var y = {
            status:"pending",
            items: x
        };

        user.orders.push(y);

        user.cartItems = [];

        user.save()

        return res.status(200).json({
            success : "Order Successful"
        });


    } catch (error) {

        return res.status(400).json({
            error: "Order Unsuccessful"
        });
    }
}

exports.deleteUserByAdmin = async (req, res) => {
	const userId = req.params.usrId;
	console.log(userId);
	try {
		const deletedUser = await User.findByIdAndDelete(userId);
		if (deletedUser) {
			console.log(deletedUser);
			return res.status(200).json("User deleted successfully");
		}
		return res.status(400).json({ error: "User not found" });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: "User not found" });
	}
};

exports.updateUserByAdmin = async (req, res) => {
    
    const userId = req.params.usrId;
    const body = req.body;
    
    try {
        if (
            !body.name &&
            !body.lastname &&
            !body.role &&
            !body.profileImgUrl &&
            !body.address
        ) {
            return res.status(400).json({
                error: "Nothing to update in body",
            });
        }
        if (body.name && body.name.length < 2) {
            return res.status(400).json({
                error: "Name must be of length 2",
            });
        }
        if (body.lastname && body.lastname.length < 2) {
            return res.status(400).json({
                error: "Last Name must be of length 2",
            });
        }
        if (body.address && body.address.mobile) {
            if (body.address.mobile.length !== 10) {
                return res.status(400).json({
                    error: "Mobile no. must be of length 10",
                });
            }
        }

        const user = await User.findByIdAndUpdate(
            { _id: userId },
            { $set: req.body },
            { new: true, useFindAndModify: false }
        );

        user.salt = undefined;
        user.encry_password = undefined;

        return res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            error: "Some Error occured while updating info",
        });
    }
};

exports.createUserByAdmin = async (req, res) => {
	const { name, lastname, email, password } = req.body;
	if (!name || !lastname || !email || !password) {
		return res
			.status(422)
			.json({ error: "Please fill all fields properly ..." });
	}

	try {
		// Validation Results
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json({
					error: errors.array()[0].msg,
					message: "Validation Error",
				});
		}

		// Check Email already exists
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			return res.status(422).json({ error: "Email already exists" });
		}

		const user = new User(req.body);

		const userRegistered = await user.save();

		if (userRegistered) {
			return res
				.status(201)
				.json({ message: "User Registered Successfully ..." });
		} else {
			return res.status(500).json({ error: "Failed to Register" });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.createUserByAdmin = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    if (!name || !lastname || !email || !password) {
        return res
            .status(422)
            .json({ error: "Please fill all fields properly ..." });
    }

    try {
        // Validation Results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({
                    error: errors.array()[0].msg,
                    message: "Validation Error",
                });
        }

        // Check Email already exists
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(422).json({ error: "Email already exists" });
        }

        const user = new User(req.body);

        const userRegistered = await user.save();
        if (userRegistered) {
            return res
                .status(201)
                .json({ message: "User Registered Successfully ..." });
        } else {
            return res.status(500).json({ error: "Failed to Register" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to Register" });
    }
};

exports.updateProfileImg = async (req, res) => {
    try {

        const file = req.file
        const result = await uploadFile(file)
        await unlinkFile(file.path)

        const user = await User.findById(req.params.userId)

        if (user) {
            user.profileImgUrl = result.Location
            await user.save()
            return res.status(200).json(user);
        }

        return res.json({error:"Error in uploading image"})

    } catch (error) {
        console.log(error);
        return res.status(400).json({error:"Unable to update profile image"})
    }
};