const express=require('express');
const Notes = require('../mongoooseModels/Notes');
const router=express.Router();
var fetchUser=require('../middleWare/fetchUser');
//! NOTE : addnotes ky liye jab router create kr rha tha to "body is not defined ka error a rha tha"
//! phir me ny below statement add ki to thk hu gya lakin is liye ku ky wo validation me ajata
//! request krnay pr phir sy error a rha tha ... body not defined
const { body, validationResult } = require('express-validator');
const { response } = require('express');


// route 1 : fetchAllNotes , "/api/notes/fetchAllNOtes"  .. LOGIN REQUIRED .. HEADER ME AUTH-TOKEN INCLUDE KRY GHY
router.get('/fetchAllNotes',fetchUser,async (req,res)=>{

    try {
        
        //! we can fetch user id through the middle ware created
    
        //todo Notes.find aek promise return kry gha , tu along with the async function we use await
        //todo for it....
        const notes=await Notes.find({user:req.user.id});
        res.json(notes);
        // obj={
        //     name:"Ehsan",
        //     age:"24"
        // }
        // res.json(obj);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

// Route 2 :adding notes  , POST REQUEST .. LOGIN REQUIRED ... AUTH-TOKEN PART OF HEADER

router.post('/addNotes',fetchUser,[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description cant be empty').isLength({min:5}),
],async (req,res)=>{

    try {
        //! Data destructuring concept
       const {title,description,tag}=req.body;
       const errors=validationResult(req);
       // if there are errors return bad request and the errors
       if(!errors.isEmpty())
       {
            return res.status(400).json({errors:errors.array()})
       }
    
       // new Notes aek promise return krta hai ... isko hm safe bhi kr saktay hein..or yw bhi aek promise return krta hai
       const note=new Notes({
        //! title, description, tag from line 36 
            title, description, tag, user:req.user.id
       })
    
       const savedNote=await note.save();
       res.json(savedNote);
        
    }catch (error) {
        res.status(500).send('Internal server error');
    }
})


// Route 3: Update notes .... PUT resques ... api/notes/updateNotes/:id
router.put('/updateNotes/:id',fetchUser,async (req,res)=>{

    try {
        const {title,description,tag}=req.body;
    
        // creating a newnote object
        const newnote={};
        if(title){
            newnote.title=title;
        }
        if(description){
            newnote.description=description;
        }
        if(tag){
            newnote.tag=tag;
        }
    
        // finding a note which is to be be updated
        let note=await Notes.findById(req.params.id);
        if(!note)
        {
            res.status(404).send({error:"Not Found"});
        }
    
        // console.log(req.user.id);
        // console.log(note.user);
    
        //! note.user.toString() will give the id of the user found and compare to the id of t
        //! of the req user 
        // user (FK) references the users 
    
        if(note.user.toString()!==req.user.id)
        {
            res.status(401).send({error:"Not Allowed"});
        }
        // this will find the note and update with the newnote object which we created previously
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        res.json(note);
        
    } catch (error) {
        res.status(500).send('Internal server error');
    }

})

// Route 4 Update notes .... DELETE resquet ... api/notes/deleteNotes/:id


router.delete('/deleteNotes/:id',fetchUser,async (req,res)=>{

    try {
        
        // finding a note which is to be be deleted
        let note=await Notes.findById(req.params.id);
        if(!note)
        {
            res.status(404).send({error:"Not Found"});
        }
    
        if(note.user.toString()!==req.user.id)
        {
            res.status(401).send({error:"Not Allowed"});
        }
        // this will find the note and delete it...
        note=await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been successfully deleted",note:note});
    } catch (error) {
        res.status(500).send('Internal server error');
    }


})
module.exports=router