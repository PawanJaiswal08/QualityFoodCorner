const NodeGeocoder = require('node-geocoder');

// dotenv
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});

const options = {
	provider: process.env.GEOCODER_PROVIDER,
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder