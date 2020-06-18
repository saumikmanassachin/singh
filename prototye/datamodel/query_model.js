const mongoose = require('mongoose');
const query_db = new mongoose.Schema({
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
    content:{
        type:String,
        required:true,
        maxlength:[500,'Mobile number cant be more than 10 integers']
    }
});
module.exports=mongoose.model('quer_db',query_db);