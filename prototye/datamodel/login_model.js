var mongoose = require('mongoose');
const schema1 = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        maxlength:[100,'email cant be more than 50 characters']
    }
});
module.exports=mongoose.model('auth',schema1);