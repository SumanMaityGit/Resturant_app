const mongoose = require("mongoose");

// schema
const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    adress:{
        type:Array
    },
    phone:{
        type:String,
        required:[true,'phone number is required']
    },
    usertype:{
        type:String,
        required:[true,'user type is required'],
        default:'clinet',
        enum:['clinet', 'admin', 'vendor', 'driver']
    },
    profile:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'
    },
    answer:{
        type:String,
        required:[true,'answer is required']
    }
},{timestamps:true});

// export
module.exports = mongoose.model('User',userSchema);