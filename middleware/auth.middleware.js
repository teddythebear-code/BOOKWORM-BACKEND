import jwt from 'jsonwebtoken'

import User from "../models/User.model.js"
const JWT_pass = process.env.JWT_pass

export const protectRoute = async (req, res, next) => {
   try {

      const token = req.header('Authorization').replace("Bearer","");
      if (!token) {
        return res.status(401).json({message:"No authorization token, access denied"});
      }

      const decoded = jwt.verify(token,JWT_pass)

      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
       return res.status(401).json({massage:"token is not vaild"})  
      }

      res.user =user;
      next()
    
   } catch (error) {
    console.error(`error in the protectRoute funtion:${error}`);
    res.status(500).json({message:"token is not vaiid"})
   }
}