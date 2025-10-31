import mongoose from 'mongoose'

const mongodb_url = process.env.MongoDB_URL

const connectDB = async ()=>{

    if (!mongodb_url) {
        throw new Error
    }
    try {

        const dataDB = await mongoose.connect(mongodb_url)
        console.log(`database live: mongoDB_01:${dataDB}` );
    } catch (error) {
        console.log(`Error connect to mongoDB_01 database:${error}`);
        process.exit(1)
    }
}

export default connectDB;