import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
export const postRegister = async (req, res) => {
    
    const {fullName, email, password} = req.body;
    try {

        if(!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        if(!email.includes('@')) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }
        if(fullName.length < 3) {
            return res.status(400).json({
                message: "Full name must be at least 3 characters long"
            });
        }



        if(password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }
        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({
                message: "User already exists with this email"
            });
        }
        
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
        if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                message: "User created successfully",
                user: {
                    id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email
                }
            });
        }else {
            return res.status(500).json({
                message: "Invalid user data"
            });
        }
            
    }
    catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
        
        
}

export const postLogin = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }
    if(!email.includes('@')) {
        return res.status(400).json({
            message: "Invalid credentials."
        });
    }
    
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                message: "Invalid credentials."
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials."
            });
        }
        const token = generateToken(user._id, res);
        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic,
                createdAt: user.createdAt,
                
            }
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


   

export const postLogout = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged Out Successfully."});
    }
    catch(error){
        console.log("Error in logout controller",error.message);
    }

}



export const checkAuth =(req,res)=>{
    try{
        if(!req.user){
            return res.status(401).json({message:"Unauthorized"});
        }
        
        const data = {
            email: req.user.email,
            fullName: req.user.fullName,
            createdAt: req.user.createdAt,
            id: req.user._id
        }
        res.status(200).json(data);
    }
    catch(error){
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message:"Internal Server Error."});
    }
}
