const mongoose = require('mongoose');

var bannerSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },

        sinceYear : {
            type: String,
            trim: true,
            required: true,
        },

        description : {
            type: String,
            trim: true,
            required: true,
        },

        bannerImage : {
            data: Buffer,
            contentType: String,
        },

        isActive: {
            type: Boolean,
            default: false
        }
    }
);

module.exports = mongoose.model('Banner', bannerSchema);