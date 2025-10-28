//* import node_modules
import {v2 as cloudinary } from 'cloudinary'
import "dotenv/config"

//* import env
const cloudinary_Cloud_name = process.env.cloudinary_Cloud_name
const cloudinary_API_Key = process.env.cloudinary_API_Key
const cloudinary_API_Secret = process.env.cloudinary_API_Secret

cloudinary.config({
    cloud_name: cloudinary_Cloud_name,
    api_key: cloudinary_API_Key,
    api_secret: cloudinary_API_Secret
})

export default cloudinary