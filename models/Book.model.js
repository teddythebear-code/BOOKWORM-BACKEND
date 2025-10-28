import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    titie:{
        type:String,
        require: true,
        unique: true
    },
    caption:{
        type:String,
        require: true,
        unique: true
    },
    image:{
        type:String,
        require: true,
        minlength: 6
    },
    rating:{
        type:Number,
        require: true,
        min:1,
        max:5
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    }
},{timestamps: true})


const Book = mongoose.model("Book",bookSchema)

export default Book