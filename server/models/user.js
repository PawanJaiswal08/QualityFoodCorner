const mongoose = require('mongoose');
const crypto = require('crypto');
// const uuid = require('uuid');
// uuid.v1();

const { v4: uuidv4 } = require('uuid');
uuidv4();


var AddressSchema = mongoose.Schema(
    {
        mobile: {
            type: Number,
            maxlength: 12,
            trim: true,
        },

        city: {
            type: String,
            trim: true,
        },

        street: {
            type: String,
            trim: true,
        },
        
        houseNumber: {
            type: String,
            trim: true,
        },
    }
);

var orderSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            trim: true,
            default: 'pending',
        },
        
        default: [],
    }
)
  

var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
        },

        lastname: {
            type: String,
            maxlength: 32,
            trim: true,
        },
        
        profileImgUrl:{
            type:String,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        address: {
            type: AddressSchema,
            // required: true,
        },

        encry_password: {
            type: String,
            required: true,
        },

        salt: String,

        role: {
            type: Number,
            default: 0,
        },

        cartItems: {
            type: Array,
            default: [],
        },

        orders: {
            type: Array,
            default: {
                status:"pending",
                items:[],
            },
        },

        // orders: {
        //     type: orderSchema,
        // },
    },
    {
        timestamps : true,
    },
);

userSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {

    authenticate : function(plainPassword){
        return this.securePassword(plainPassword) === this.encry_password
    },

    securePassword : function(plainPassword){
        if(!plainPassword) return '';

        try {
            return crypto.createHmac('sha256',this.salt).update(plainPassword).digest('hex');
        } catch (error) {
            return '';
        }
    },
}

module.exports = mongoose.model("User" , userSchema);