const mongooose =require('mongoose');
const class_11th=new  mongooose.Schema({
    note_id:{
        type:String,
        required:true,
        maxlength:[4,'cant be more than 9999']
    },
    title:{
        type:String,
        required:true,
        maxlength:[100,'cant be more than 100']
    },
    link:{
        type:String,
        required:true,
        maxlength:[1000,'cant be more than 1000 ']

    }

})
module.exports=mongooose.model('class11',class_11th);