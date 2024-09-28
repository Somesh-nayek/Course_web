const {Router}=require("express");
const {Admin,Course}=require('../dataBase/db');
const AdminRouter=Router();
const bcrypt=require('bcrypt')

AdminRouter.get("/",(req,res)=>{
    res.render("admin/admin");
});
AdminRouter.get('/signIn',function(req,res){
    res.render("admin/admin_login");
});
AdminRouter.get('/signUp',function(req,res){
    res.render("admin/admin_register");
});
AdminRouter.post('/signUp',async function(req,res){
    const {email,password,firstName,lastName}=req.body;
    const pw=await bcrypt.hash(password,10);
    const data={
        email:email,
        password:pw,
        firstName:firstName,
        lastName:lastName
    };
    try{
        await Admin.create(data);
        return res.json({
            message:"Signed Up successfully"
        })
    }catch(error){
        return res.json({
            message:"Error:",
            error:error.message
        })
    }
});
AdminRouter.post('/signIn',async function(req,res){
    const {email,password}=req.body;
    try{
        const user=await Admin.findOne({email});
        if(user){
            const success=bcrypt.compare(password,user.password);
            if(success){
                return res.json({
                    message:"you have successfully signed in"
                });
            }else{
                return res.json({
                    message:"Incorrect password"
                });
            }
        }else{
            return res.json({
                message:"Email does not exist"
            });
        }
    }catch(error){
        return res.json({
            message:"Error",
            error:error.message
        });
    }
});
AdminRouter.post('/course',async function(req,res){
    return res.json({
        message:"Admin add course"
    });
});
AdminRouter.put('/course',async function(req,res){
    return res.json({
        message:"Admin update course"
    });
});
AdminRouter.get('/get',async function(req,res){
    return res.json({
        message:"Admin get his courses"
    });
});
module.exports={
    AdminRouter
}