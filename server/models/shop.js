const mongoose = require('mongoose');

var shopSchema = new mongoose.Schema(
    {
        shopName: {
            type: String,
            required:true,
            trim: true,
            maxlength:50
        },

        shopLogo: {
            data: Buffer,
            contentType: String,
        },

        shopFacebook: {
            type: String,
            trim: true,
        },

        shopInstagram: {
            type: String,
            trim: true,
        },

        shopTwitter: {
            type: String,
            trim: true,
        },

        aboutUs: {
            type: String,
            trim: true,
        }

    },
    
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Shop', shopSchema);