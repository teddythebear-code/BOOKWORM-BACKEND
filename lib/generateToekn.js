//* import node_modulel
import jwt from "jsonwebtoken"
import "dotenv/config"

//* import env
const JWT_pass = process.env.JWT_pass
const JWT_ex = process.env.JWT_ex

const generateToekn = (userId)=>{
   return jwt.sign({userId},JWT_pass,{expiresIn: JWT_ex})
}

export default generateToekn