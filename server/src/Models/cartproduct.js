const mongoose = require("mongoose");

const cartProductSchema = new mongoose.Schema({

    productId : {
        type : mongoose.Schema.ObjectId,
        ref : 'Products'
    },
    quantity : {
        type : Number,
        default : 1
    },
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }
},{
    timestamps : true
} )

const cartProduct = mongoose.model('cartProduct',cartProductSchema )

module.exports = cartProduct;