const mongoose = require('mongoose');

var offerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },

        feature: {
            type: Array,
            default: [],
        },

        offerImage: {
            type: String,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: false,
        }

    },
    
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Offer', offerSchema);