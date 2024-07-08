const mongoose = require("mongoose");

// schema
const categorySchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'Category title is required']
    },
    imageUrl:{
        type:String,
        default:'https://icon-library.com/images/category-icon-png/category-icon-png-14.jpg'
    }
},{timestamps:true});

// export
module.exports = mongoose.model('Category',categorySchema);