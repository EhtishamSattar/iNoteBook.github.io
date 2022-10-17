var jwt = require('jsonwebtoken');

// hard code secret ... isko aek evvironment variable rakhna hai 
const JWT_SECRET="$Ehtisham";
const fetchUser=(req,res,next)=>{
    //! we have to include this auth-token header and giving it a auth-token to
    const token=req.header('auth-token');
    if(!token){
        res.status(401).json({erorr:'please enter with the valid token'});
    }
    
    try {
        //! verification of the token
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
        
    } catch (error) {
        res.status(401).json({erorr:'please enter with the valid token'});
        
    }
}
module.exports=fetchUser;