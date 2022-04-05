const mongoose = require('mongoose');
const Schema = mongoose.Schema
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var validatePhone = function(phone) {
    var re = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    return re.test(phone)
};
const UserSchema = Schema({
    name:{
        type:String,
        min:[2,'The name must be at least 2 characters.'],
        max:[60,'The name must be less than 60 characters.'],
        required: [true, 'Name is required']
    },
    email:{
        type:String ,
        max:[100,'The email must be less than 100 characters.'],
        required: [true,'Email address is required'],
        validate: [validateEmail, 'Please fill a valid email address'],
        //match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: [true,'Email is in use']
    },
    phone:{
        type:String,
        unique: true,
        required: [true,'Phone number is required'],
        validate: [validatePhone, 'Please fill a valid Phone number'],
    },
    position_id:{
        type:Number,
        required:[true,'position_id is required'],
        min:[1,'Minimum 1'],
    },
    photo:{
        data: Buffer,
        contentType: String
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = User