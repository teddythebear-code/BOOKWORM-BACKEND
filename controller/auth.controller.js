//* import node_modulel
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import "dotenv/config"

//* import models
import User from "../models/User.model.js"

//* import lib
import generateToekn from "../lib/generateToekn.js"

//* import env
const Dicebear = process.env.Dicebear


//* register function
export const Register = async (req,res,next) =>{

  const Session = await mongoose.startSession()
  Session.startTransaction()

       try {

        const {username,email,password} = req.body

        if (!username || !email || !password) {
          return  res.status(400).json({message: "all fiend are required"})
        }

        if (password.length < 6 ) {
          return  res.status(400).json({message: "password should be are required"})
        }

        if (username.length < 3 ) {
          return  res.status(400).json({message: "username should be are required"})
        }


       //  chicking if user email and user exists
        const existsemail = await User.findOne({email})
        if (existsemail) {
            return res.status(409).json({message:"User with this email already exists."})  
        }
        
        const existsuser = await User.findOne({username})
        if (existsuser) {
            return res.status(409).json({message:"Username already exists."})  
        }
        //
        const salt = await bcrypt.genSalt(10);
        const hashpasswoed = await bcrypt.hash(password,salt);

        //make the user 

        const profileImage =  `${Dicebear}=${username}`;

        const user = new User({
            username,
            email,
            password:hashpasswoed,
            ProfileImage:profileImage,
        });

        // jwt 

        const toekn = generateToekn(user._id)

        await user.save();

        res.status(201).json({user:{
                                   id:user._id,
                                   username:user.username,
                                   email:user.email,
                                   profileImage:user.ProfileImage
        },Toekn:toekn,message:`success New user created`})

        Session.endSession()

       } catch (error) {
        await Session.abortTransaction()
        Session.endSession()
        console.error(` register function error:${error}`)
        res.status(500).json({message:`Internal Server Error`})
       }
}


//* login function
export const login = async (req,res,next) =>{

  try {
    const {email,password} = req.body

      const user = await User.findOne({email}) 
      if (!user) {
        return res.status(400).json({message:'invalid credentials'})
      }

      const isUserPassword = await bcrypt.compare(password,user.password)

      if (!isUserPassword) {
        return res.status(400).json({message:'invalid credentials'})
      }

     const toekn = generateToekn(user._id)

       res.status(201).json({user:{
                                   id:user._id,
                                   username:user.username,
                                   email:user.email,
                                   profileImage:user.ProfileImage
        },Toekn:toekn,message:`success user login`})


  } catch (error) {
    console.error(`login function error:${error}`)
        res.status(500).json({message:`Internal Server Error`})
  }
}