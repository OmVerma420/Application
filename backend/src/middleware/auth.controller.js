import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt  from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async(req, _, next) => {
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    //  console.log("Received token:", token); 
    //  console.log("Authorization Header:", req.header("Authorization"));
    //  console.log("Cookies:", req.cookies);
    
     if(!token){
         throw new ApiError(401 , "Unauthorized request")
     }
 
     const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
     

     if(!decodedToken){
      throw new ApiError(401 , "token is invalid")
     }
 
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
     

     if(!user){
         throw new ApiError(401 , "Invalid Access Token")
     }
 
     req.user = user;
     next()
   } catch (error) {
    console.error("JWT verification error:", error.message)
    throw new ApiError(401 , error?.message || "Unauthorized request")
    
   }
})