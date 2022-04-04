const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});


// @desc Create a User
// @route POST /api/user/signup
// @access Public
exports.signup = async (req,res) => {

    const {name, lastname, email, password} = req.body;
    if (!name || !lastname || !email || !password ) {
        return res.status(422).json({error:"Please fill all fields properly ..."});
    }
    
    try {

        // Validation Results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg, message: "Validation Error" });
        }

        // Check Email already exists
        const userExists = await User.findOne({email:email});
        if (userExists) {
            return res.status(422).json({error:"Email already exists"});
        }

        const user = new User(req.body);

        const userRegistered = await user.save();

        if (userRegistered) {
            return res.status(201).json({message: "User Registered Successfully ..."});
        }
        else {
            return res.status(500).json({error: "Failed to Register"});
        }
        
    } catch (error) {
        console.log(error);
    }  
}

// @desc Signin a User
// @route POST /api/user/signin
// @access Public
exports.signin = async (req,res) => {
    
    try {

        const {email,password} = req.body;

        // Validation Results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        const user = await User.findOne({ email: email });

        if (user) {

            if(!user.authenticate(password)){
                return res.status(401).json({
                    error: "Invalid Credentials !!"
                })
            }

            // create token
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

            // put token in cookie
            res.cookie('token', token, {expire: new Date() + 9999});
            
            // send respnse to front-end
            const {_id, name, lastname, email, role, address} = user;
            return res.json({token, user: {_id, name, lastname, email, role, address}})
        }
        
        else{
            res.status(400).json({
                error: "User Email does not exists"
            })
        }
        
    } 
    catch (error) {
        console.log(error);
    }

}

// @desc Signout a User
// @route POST /api/user/signup
// @access Public
exports.signout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message:"User Signout Successfully"
    });
}

// @desc Check Weather User is Signedin
exports.isSignedin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ['sha1', 'RS256', 'HS256']
});

// @desc Check Weather User is Authenticated
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCSESS DENIED"
        })
    }
    next();
}

// @desc Check Weather User is Admin
exports.isAdmin = (req, res, next) => {
    // no auth
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not Admin , ACCESS DENIED"
        })
    }
    next();
}