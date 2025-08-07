import jwt from 'jsonwebtoken';
import  User  from '../models/user.model.js';


export const protectRoute=async (req,res,next)=>{
    try{
        
       const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized Access - No token provided" });
        }

        const token = authHeader.split(" ")[1];
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({message:"Unauthorized Access - No token Provided"});
        }
        const user =await User.findOne({_id : decoded.userId}).select("-password");
        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }
        req.user=user;
        
        next();
    }
    catch(err){
        console.log("Error in protectRoute: ",err);
        return res.status(500).json({message:"Internal Server Error."});
    }
}

