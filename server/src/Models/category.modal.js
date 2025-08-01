const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    images: [{
        type: String
    }],
    color: {
        type: String,
       
    },
    parentCatname: {
        type: String
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    }
    },{timestamps: true})

const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;
