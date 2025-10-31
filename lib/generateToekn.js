//* import node_modulel
import jwt from "jsonwebtoken"
import "dotenv/config"

//* import env
const JWT_pass = process.env.JWT_pass
const JWT_EX = process.env.JWT_EX

const generateToekn = (userId)=>{
   return jwt.sign({userId},JWT_pass,{expiresIn: JWT_EX })
}

export default generateToekn