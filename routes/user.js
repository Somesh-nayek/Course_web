const {Router}=require("express");
const UserRouter=Router();
const {User}=require('../dataBase/db');
const passport=require('passport');
const bcrypt=require('bcrypt');
const expressSession=require('express-session')

//passport configuration
const {initializingPassport_user}=require('./passportConfig');
UserRouter.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}));
UserRouter.use(passport.initialize());
UserRouter.use(passport.session());
UserRouter.use(passport.authenticate('session'));
initializingPassport_user(passport);
UserRouter.get('/',function(req,res){
    res.render("user/user");
});
UserRouter.get('/signIn',function(req,res){
    res.render("user/user_login");
});
UserRouter.get('/signUp',function(req,res){
    res.render("user/user_register");
});
UserRouter.post('/signUp',async function(req,res){
    const {email,password,firstName,lastName}=req.body;
    const user=await User.findOne({email:email});
    if(user) return res.status(400).send("User already exists");
    const pw=await bcrypt.hash(password,10);
    try{
        await User.create({
            email:email,
            password:pw,
            firstName:firstName,
            lastName:lastName
        });
        return res.redirect('/api/v1/user/signIn');
    }catch(error){
        return res.json({
            message:"error creating message",
            error:error.message
        });
    }
});
UserRouter.post('/signIn',passport.authenticate('local',
    {failureRedirect:'/api/v1/user/signUp',
    successRedirect:'/'}));
UserRouter.post('/purchase',async function(req,res){
    return res.json({
        message:"User buys a course"
    });
});
UserRouter.get('/get',async function(req,res){
    return res.json({
        message:"User get his courses"
    });
});
module.exports={
    UserRouter
}