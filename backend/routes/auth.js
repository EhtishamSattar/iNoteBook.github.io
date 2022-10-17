const express=require('express');
const Users = require('../mongoooseModels/Users');
const router=express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser=require('../middleWare/fetchUser');

//! this is the secret for Json web token authentication , a security purpose between client and server
const JWT_SECRET="$Ehtisham";
// Create a user using Post "/api/auth/createUser".Does not require login

//! to use the express validator we have to install express validator package
//! then we add the below statement
const { body, validationResult } = require('express-validator');
const { response } = require('express');

// Route 1: createuser is a endpoint
router.post('/createUser',[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],
//! async returns a promise
async (req,res)=>
{
    // obj={
    //     name:"Ehtisham",
    //     age:"21"
    // }
    //res.json(obj);
    //! tutoriaL 45
    // console.log(req.body);
    // const user= Users(req.body);
    // user.save()
    // res.send("Ehtisham");
    //! tutorial 46
     // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }


    //! tutorial 47

    //todo NOTE ABOUT COLLECTIONS 
    // hm collections ko emport bhi kr saktay hein 
    //  unhay dosry system py import kt ky use bhi kr saktay hein

     try{
        let success=false;
         //!  Users.findOne will return a promise, await lagae ghy
         //! and await will make this statement wait for the promise to resolve
         //todo await Userds likh ky hm try catch wala error check kr saktay hein
         let user = await Users.findOne({email:req.body.email});
        // if it finds the email , 400 status will be displayed
         if(user)
         {
            return res.status(400).json({success,error:"Sorry, A user with this email exists"});
         }
             

            //! bcrypt.genSaltSync and bcrypt.hashSync returns the promises ---> is liye await lage ghy sath
            var salt= await bcrypt.genSaltSync(10);
            var securityPass=await bcrypt.hashSync(req.body.password,salt);
           user= await Users.create({
                name: req.body.name,
                email:req.body.email,
                password: securityPass
            })

            const data={
                user:{
                    id:user.id
                }
            }
            success=true;
            var authToken = jwt.sign(data, JWT_SECRET);
            res.json({success,authToken});
        }catch(err)
        {
            console.log(err.message);
            // response me hm ny 1 anonymus object bana ky bhej dia
            res.status(500).json({error:'Sorry some error occured'});
        }

      //! hr error ky unique email wala error message to nhi diA ja sakta that's why we commented
      //! this is tutorial 46's part
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    // res.json({error:"Please enter a unique value for email",message:err.message})});

    // res.send(req.body);
})


/// Route 2: CREATING A LOGIN 

router.post('/Login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Password cant be blank').exists(),
],async (req,res)=>{

    let success=false;
    let errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }

    try 
    {
        const {email,password}=req.body;
        let user=await Users.findOne({email});
        if(!user)
        {
            success=false;
            return res.status(400).json({success,error:'Invalid Email'});
        }

       // user from the findone function , that user password is compared with the entered 
       //password
        const passwordCompare=await bcrypt.compare(password,user.password);

        if(!passwordCompare)
        {
            success=false;
            return res.status(400).json({success,error:'Incorrect Password'});
        }

        const data={
            user:{

                id:user.id
            }
        }
        success=true;
        var authToken = jwt.sign(data, JWT_SECRET);
        res.json({success,authToken});

    }catch (error) {
        res.status(500).send('Internal server error');
    }

})

// Route 3 : getting user details using post request


router.post('/getUser',fetchUser,async (req,res)=>{

    try 
    {
      userId=req.user.id;
      //!user a janay ky bad , uski tamam field dekh saktay except password
      const user=await Users.findById(userId).select("-password");
      res.send(user);
    }catch (error) {
        res.status(500).send('Internal server error');
    }

})

module.exports=router