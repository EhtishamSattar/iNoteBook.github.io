//mongoose is a javascript object oriented programming library that create a 
//connection between MongoDb and the Node.js Javascript runtime environment
const mongoose=require('mongoose');
//! mongoose manages the database 
// akhri forward slash ky bad jo bhi apki created database ka naam hai wo likh dein
const mongooseURI='mongodb://localhost:27017/inotebook';

const connectToMongoose=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log("connected to mongoose successfully");
    })
}
module.exports=connectToMongoose;