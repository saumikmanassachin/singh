const mongoose =require('mongoose');
const schema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model('super_user',schema);