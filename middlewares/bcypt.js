const User=require('../dataBase/db');
const bcrypt=require('bcrypt');
async function decode(req,res,next){
    const password=req.body.password;
    const user=await User.findOne({email});
     const pw=bcrypt.compare(password,user.password);
}