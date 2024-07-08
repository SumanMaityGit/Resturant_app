const mongoose = require("mongoose");

// schema
const foodSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true,'Food title is required']
    },
    description:{
        type:String,
        required:[true,'Food description is required']
    },
    price:{
        type:Number,
        required:[true,'Food price is required']
    },
    imageUrl:{
        type:String,
        default:'https://graphicsfamily.com/wp-content/uploads/edd/2021/06/Food-Logo-Design.jpg'
    },
    foodTags:{
        type:String
    },
    category:{
        type:String
    },
    code:{
        type:String
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    resturant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resturant'
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    }
},{timestamps:true});

// export
module.exports = mongoose.model('Foods',foodSchema);