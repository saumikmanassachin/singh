const mongoose = require('mongoose');
const blog_data = new mongoose.Schema({
    blog_id:{
        type:Number,
        required:true,
        maxlength:[7,'cant have more than 999 blogs']
    },
    title:{
        type:String,
        maxlength:[50,'cant be more than 50'],
        required:true
    },
    content:{
        type:String,
        maxlength: [4000,'cant be more than 2000'],
        required: true
    }
});
module.exports=mongoose.model('blog_data',blog_data);