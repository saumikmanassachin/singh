const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:[50,'name cant be more than 50 characters']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        maxlength: [50,'email cant be more than 50 characters']
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        maxlength:[10,'Mobile number cant be more than 10 integers']
    }
});
module.exports=mongoose.model('model1',schema);