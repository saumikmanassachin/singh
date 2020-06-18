var express = require('express');
var mongoose = require('mongoose');
var bodyparser= require('body-parser');
const input1 = require('../prototye/datamodel/login_model');
const input = require('../prototye/datamodel/data_model');
const query_auth = require('../prototye/datamodel/query_model');
const auth = require('../prototye/datamodel/blog_model');
const blog = require('../prototye/datamodel/blog_model');
const quiz =require('../prototye/datamodel/quiz_model');
const notes_8th=require('../prototye/datamodel/8th_notes');
const notes_9th=require('../prototye/datamodel/9th_notes');
const notes_10th=require('../prototye/datamodel/10th_notes');
const notes_11th=require('../prototye/datamodel/11th_notes');
const notes_12th=require('../prototye/datamodel/12th_notes');
const mailer = require('nodemailer');
//connection to DATAbase
mongoose.connect('mongodb+srv://admin_project:<myworkisgood>@myproject-s70mj.gcp.mongodb.net/<test>?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

//set up things for authentication dont change these might create problem if changed
var app = express();
app.use(express.static(__dirname));
app.use(bodyparser.json());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended:true
}));

//login function
app.post('/login',function (req,res) {
    const email1=req.body.email;
    input1.findOne({email:email1},function (error,result) {
        if(result)
        {
            if(result.email=='6ad614040bd685c19b9b126939c09702@superuser.com')
        {
            console.log(result.email);
            return res.redirect('admin_dashboard.html');
        }
            else
            return res.redirect('notes.html');
        }
        else
        {
            console.log('error spotted');
            return res.redirect('signup.html');
        }
        
    });

})
//registration
app.post('/sign_up',function (req,res) {
    var name1=req.body.name;
    var email1=req.body.email;
    var phone1=req.body.phone;
    console.log(name1,email1,phone1);
    input.findOne({email:email1},function(error,Alreadyexist)
    {
        if(error) console.log('new user to be entered');
        if(Alreadyexist)
        {
            res.redirect('login.html')
        }
            const value = input({name:name1,email: email1,phone: phone1});
            const value1 = input1({email:email1});
            value.save().then(()=>console.log('data inserted in the database please check to confirm'));
            value1.save();
            res.redirect('login.html');
    })
    
})
// handling queries
app.post('/queries',function(req,res)
{
    const name2=req.body.name;
    const email2=req.body.email;
    const query = req.body.Subject;
    const msg = req.body.Message;
    const message=query+"  :-"+msg;
    console.log(message)
    const value2= query_auth({name:name2,email:email2,content:message});
    value2.save();
    const sender =mailer.createTransport({
        service:'gmail',
        auth:{
            user: 'Singhclasses.abhishek@gmail.com',
            pass: 'singhclassesabhi24'
        }
    })
    const mailoption = { from: 'Singhclasses.abhishek@gmail.com',
    to: 'manas.vishnoi@gmail.com',
    subject: email2,
    text:message
};
    sender.sendMail(mailoption, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('congratulation.html');
    }
});
})
//add blog
app.post('/addblog',function (req,res) {
    /*const fixing=req.body.blog_id+'blog';*/
    const blog1 =blog({blog_id:req.body.blog_id,title:req.body.title,content:req.body.blog});
    blog1.save();
    res.redirect('congratulation.html');
})
//view whole blog page
app.get('/blogpage',function(req,res)
{
    auth.find({},function(err,result){
        if(result)
        {
            res.render('forposts.pug',{posts:result});
        }
        else
        {
            res.redirect('notfound.html');
        }
    })
})
//get request
app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(8080);
//viewing specific blog
app.get('/:id', function(req, res,) {
    const id =req.params.id;
    const fix = id.match(/(\d+)/);
    if(fix[0]!=null)
    {
	auth.findOne({blog_id:fix[0]},function(err, post){
        if(err) res.redirect('notfound.html')
		res.render('addpost.pug',{
  			blog_id:post.blog_id,title:post.title,message:post.title,p:post.content});
    });
}
});
// delete blog 
app.post('/deleteblog',function(req,res){
    const id =req.body.blog_id;
    blog.deleteOne({blog_id:id},function(err,result)
    {
        console.log('deleted the document');
    })
})
// create quiz 
app.post('/quiz_create',function (req,res) {
    const iden=req.body.id;
   const question=req.body.question;
   const opt1=req.body.option1;
   const opt2=req.body.option2;
   const opt3=req.body.option3;
   const opt4=req.body.option4;
   const corr=req.body.Correct;
   const value=quiz({ques_id:iden,question:question,option1:opt1,option2:opt2,option3:opt3,option4:opt4,Correct:corr});
   value.save();
   res.redirect('quiz_create.html');
})
//to add notes for class 8th
app.post('/addnotes8',function(req,res){
    const note_8=req.body.notes_id;
    const title_8=req.body.title;
    const link_8=req.body.link;
    const save_8_notes=notes_8th({note_id:note_8,title:title_8,link:link_8})
    save_8_notes.save();
     res.redirect('congratulation.html');
 })
 //to add notes for class 9th
 app.post('/addnotes9',function(req,res){
    const note_9=req.body.notes_id;
    const title_9=req.body.title;
    const link_9=req.body.link;
    const save_9_notes=notes_9th({note_id:note_9,title:title_9,link:link_9})
    save_9_notes.save();
     res.redirect('congratulation.html');
 })
 //to add notes for class 10th
 app.post('/addnotes10',function(req,res){
    const note_10=req.body.notes_id;
    const title_10=req.body.title;
    const link_10=req.body.link;
    const save_10_notes=notes_10th({note_id:note_10,title:title_10,link:link_10})
    save_10_notes.save();
     res.redirect('congratulation.html');
 })
//to add notes for class 11th
app.post('/addnotes11',function(req,res){
    const note_11=req.body.notes_id;
    const title_11=req.body.title;
    const link_11=req.body.link;
    const save_11_notes=notes_11th({note_id:note_11,title:title_11,link:link_11})
    save_11_notes.save();
     res.redirect('congratulation.html');
 })
 // to add notes for 12th class
 app.post('/addnotes12',function(req,res){
    const note_12=req.body.notes_id;
    const title_12=req.body.title;
    const link_12=req.body.link;
    const save_12_notes=notes_12th({note_id:note_12,title:title_12,link:link_12})
    save_12_notes.save();
     res.redirect('congratulation.html');
 })
 //FROM HERE WE WILL VIEW NOTES CLASS WISE WE ARE JUST RENDERING ONE PUG FILE
 //to view notes of class 8th
 app.get('/view_note_8',function(req,res){
    notes_8th.find({},function(err,result){
        if(result)
        {
            res.render('fornotes.pug',{posts:result});
            console.log(result)
        }
        else
        {
            res.redirect('notfound.html');
        }
    })
})
//to view notes of class 9th
app.get('/view_note_9',function(req,res){
    notes_9th.find({},function(err,result){
        if(result)
        {
            res.render('fornotes.pug',{posts:result});
            console.log(result)
        }
        else
        {
            res.redirect('notfound.html');
        }
    })
})
//to view notes of class 10th
app.get('/view_note_10',function(req,res){
    notes_10th.find({},function(err,result){
        if(result)
        {
            res.render('fornotes.pug',{posts:result});
            console.log(result)
        }
        else
        {
            res.redirect('notfound.html');
        }
    })
})
//to view notes of class 11th
app.get('/view_note_11',function(req,res){
    notes_11th.find({},function(err,result){
        if(result)
        {
            res.render('fornotes.pug',{posts:result});
            console.log(result)
        }
        else
        {
            res.redirect('notfound.html');
        }
    })
})
//to view notes of class 12th
app.get('/view_note_8',function(req,res){
    notes_12th.find({},function(err,result){
        if(result)
        {
            res.render('fornotes.pug',{posts:result});
            console.log(result)
        }
        else
        {
            res.redirect('notfound.html');
        }
    })
})

