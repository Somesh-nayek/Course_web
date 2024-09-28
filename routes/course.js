const {Router}=require("express");
const {courseSchema,}=require('../dataBase/db');
const CourseRouter=Router();

CourseRouter.get('/',async function(req,res){
    return res.json({
        message:"get all the courses"
    });
});
module.exports={
    CourseRouter
}