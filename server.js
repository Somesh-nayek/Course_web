const dotenv=require('dotenv');
dotenv.config();
const express=require("express");
const app=express();
const mongoose=require('mongoose');
const {UserRouter}=require('./routes/user');
const{AdminRouter}=require('./routes/admin');
const {CourseRouter}=require('./routes/course');
const bodyParser = require('body-parser');
UserRouter.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/v1/user',UserRouter);
app.use('/api/v1/admin',AdminRouter);
app.use('/api/v1/course',CourseRouter);
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
});

async function main(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("connected to mongoose");
        app.listen(3000,()=>{
            console.log("server is running on port 3000");
        });
    }catch(error){
        console.log("Error connecting to mongoDb:",error);
        process.exit(1);
    }
}
main();
