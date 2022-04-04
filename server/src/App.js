// dotenv
const dotenv = require('dotenv');
dotenv.config({ path:'./../config.env' });

// Express
const express = require('express');
const app = express();
const path = require('path');

// Express Static
app.use('/logs', express.static(path.join(__dirname, './../qfc-logs')))

// Database Connection
require('./../assets/DbConnection')();

// Middlewares
app.use(require('./Middlewares'));

// Swagger Documentation
app.use('/api-docs', require('./../api-docs/Swagger'))

// Morgan-Logger
app.use(require('../assets/MorganLogger'))

// Server
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Backend deployed');
})

// Routes
app.use('/api', require('./Routes'))

app.get('/daily-log-file/:filename', (req, res) => {
    let filename = `${req.params.filename}`
    res.sendFile(path.join((__dirname + `./../qfc-logs/${filename}`)))
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})
