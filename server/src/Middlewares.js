const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet')

module.exports = [

    // Express-JSON
    express.json(),

    // BodyParser
    bodyParser.json(),
    
    // CookieParser
    cookieParser(),

    // CORS    
    cors({
        // origin: 'http://localhost/:3000/',
        // headers: "*",
        // preflightContinue: false,
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }),

    helmet(),
]
