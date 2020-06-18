const mongoose = require('mongoose');
const quiz_schema= new mongoose.Schema({
    ques_id:
        {
          type:Number,
          required:true,
          trim:true,
          maxlength:[2,'cant be more than 2 digits']
        },
    question:{
        type:String,
        required:true,
        maxlength:[500,'question cant be more than 500 characters'],
        trim:true
    },
    option1: {
        type: String,
        required: true,
        maxlength: [30, 'options cant be more than 30 characters']
    },
    option2: {
        type: String,
        required: true,
        maxlength: [30, 'options cant be more than 30 characters']
    },
    option3: {
        type: String,
        required: true,
        maxlength: [30, 'options cant be more than 30 characters']
    },
    option4: {
        type: String,
        required: true,
        maxlength: [30, 'options cant be more than 30 characters']
    },
    Correct:{
        type:String,
        required:true,
        maxlength:[1,'cant be more than 1 character']
    }
});
module.exports=mongoose.model('quiz_schema',quiz_schema);
