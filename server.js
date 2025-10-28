//* import express
import express from "express"
import 'dotenv/config'
import cors from "cors"

//* import routes
import authRouter from "./routes/auth.route.js"
import bookRouter from "./routes/book.route.js"

//* import database
import connectDB from './database/mongodb.js'

//* import env
const PORT = process.env.PORT || 5500
const HOST = process.env.HOST || 'https://localhost:'

//* express
const app = express()

//* middleware
app.use(express.json());
app.use(cors({origin : "*"}));

//* routes
app.use('/api/auth',authRouter)
app.use('/api/book',bookRouter)


//  ! runing server 
app.listen(PORT, async ()=>{
    console.log(`BOOKWORM-APP server runing on ${HOST}${PORT}`);
    await connectDB()
})