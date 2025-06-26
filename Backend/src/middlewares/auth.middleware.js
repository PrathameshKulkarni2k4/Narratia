import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


// next is used in middleware
export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request nahi re sod ki") 
        }
    
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
    
        
        const account = await User.findOne() 
        if (!account) {
            throw new ApiError(401, "Invalid Access Token")
        }
        
        req.user = decodedToken.id;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})


