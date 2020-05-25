const mongoose=require('mongoose');
const express=require('express');
const multer=require('multer');
const path=require('path');
const AVATR_PATH=path.join("/uploads/users/avatars");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    city:{
        type:String
    },
    avatar:{
        type:String
    }
    
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
});

userSchema.statics.uploadedAvatar=multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath=AVATR_PATH;
const User=mongoose.model('User',userSchema);
module.exports=User;