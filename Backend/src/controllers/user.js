import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export const Register = async (req , res) =>{
    try {
        const {name , username , email , phone , password} = req.body;

        if (!name || !username || !email || !phone || !password) {
            return res.status(401).json({
                message: "Please fill in all fields",
                success: false
            });
        }

         const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Email already exists",
                success: false
            });
        }

         const hashedPassword = await bcryptjs.hash(password, 10);

           await User.create({
            name,
            username,
            email,
            phone,
            password: hashedPassword
        });

         return res.status(201).json({
            message: "User created successfully",
            success: true
        });
    } catch (error) {
         console.error("Error in Register function:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(401).json({
                message: "Please fill in all fields",
                success: false
            });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({
                message: "User not found!!!",
                success: false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        return res
            .status(201)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
            .json({
                message: `Welcome back ${user.name}`,
                user,
                success: true
            });

    } catch (error) {
        console.error("Error in Login function:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const Logout =(req,res)=>{
    return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({
        message: "Logged out successfully",
        success:true
    })
};


