const mongoose=require('mongoose');
const { Schema } = mongoose;

//! notes.js and user.js are the schemas for database 

const UserSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:Date,
        default: Date.now
    }
  });

  module.exports=mongoose.model('users',UserSchema);