const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true , 'Name is required'],
    },
    email: { 
        type: String, 
        required : [true, 'Email is required'],
        unique : true  
    },
    password: {
        type: String,
        default : ""
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    refresh_Token: {
        type: String,
        default: ""
    },
    access_Token: {
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active'
    },
    address_details: [{
        type: mongoose.Schema.ObjectId,
        ref: 'address', 
    }],
    shopping_cart: [{
        type: mongoose.Schema.ObjectId,
        ref: 'cartProduct', 
    }],
    orderHistory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'order', 
    }],
    forgot_password_otp: {
        type : String,
        default : null
    },
    forgot_password_expiry : {
        type : Date,
        default : ""
    },
    role : {
        type : String,
        enun : ['ADMIN',"USER"],
        default : "USER"
    },
    otp: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    }

},{
    timestamps : true
});    

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel;

