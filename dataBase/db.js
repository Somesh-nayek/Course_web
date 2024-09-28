const {Schema,ObjectId, default: mongoose}=require('mongoose');
const userSchema=new Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    courses:[ObjectId]
});
const adminSchema=new Schema({
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    firstName:{type:String,required:true},
    lastName:{type:String,required:true}
});
const courseSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    imageURL:{type:String,required:true},
    creatorID:{type:ObjectId,required:true}
});
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
module.exports={
    User,
    Admin,
    Course
};