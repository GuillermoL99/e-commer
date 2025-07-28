const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    
    address_line : {
        type : String,
        default : ""
    },
    city : {
        type : String,
        default : ""
    },
    state : {
        type : String,
        default : ""
    },
    pincode : {
        type : String
    },
    country : {
        type : String
    },
    mobile : {
        type : Number,
        default : null
    },
    address_type : {
        type : String,
        enum : ['casa', 'trabajo'],
        default : 'casa'
    },
    status : {
        type : Boolean,
        default : true
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        default : ""
    }

},{
    timestamps : true
});

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;