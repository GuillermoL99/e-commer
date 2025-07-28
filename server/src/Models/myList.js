const mongoose = require("mongoose");
const { type } = require("os");


const mylistSchema = new mongoose.Schema({

    productId : {
        type : String,
        required: true
    },
    userId : {
        type : String,
        required: true
    },
    productTitle:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    oldPrice:{
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },

},{
    timestamps: true
});

const MyList = mongoose.model('MyList', mylistSchema);
module.exports = MyList;