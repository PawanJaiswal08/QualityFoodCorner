const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

var productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            required: true,
            maxlength: 2000,
        },

        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32,
        },

        category: {
            type: ObjectId,
            ref: 'Category',
            required: true,
        },

        stock: {
            type: Number,
        },

        sold: {
            type: Number,
            default: 0,
        },

        photo: {
            data: Buffer,
            contentType: String,
        },

        photoUrl: {
            type: String,
            trim: true,
        }
    },
    
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Product', productSchema);