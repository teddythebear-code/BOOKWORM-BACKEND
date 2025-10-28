import mongoose from "mongoose";

import cloudinaey from "../lib/cloudinary.js"

import Book from "../models/Book.model.js";


export const createBook = async (req,res) =>{

    const Session = await mongoose.startSession();
    Session.startTransaction();

        try {
            const {titie, caption, image, rating} = req.body

            if (!titie || !caption || !image || !rating) {
                return res.status(401).json({message:"all fiend are required"})
            }

            const uploadResponse = await cloudinaey.uploader.upload(image)
            const imageUrl = uploadResponse.secure_url

            const newBook =  new Book({
                titie,
                caption,
                image:imageUrl,
                rating,
                user: req.user._id
            })

            await newBook.save()

            res.status(201).json({newBook,
                                  message:"success adder a new book"
            });
            Session.endSession(); 
        } catch (error) {
             Session.abortTransaction()
             Session.endSession()
            console.log(`create Book function error: ${error}`);
            res.status(500).json({message:`Internal Server Error`})
        }
}

export const getBook = async (req,res) =>{
       try {

        const page = req.query.page || 1 
        const limit = req.query.limit || 5
        const skip = ( page - 1 ) * limit

        const book = await Book.find().sort({ createdAt: -1})
        .skip(skip).limit(limit).populata('user',"username profileImage");

        const totalBooks = await Book.countDocuments();

        res.send({
                 book,
                 currentPage: page,
                 totalBooks,
                 totalPages: Math.ceil(totalBooks/ limit),
                })

    } catch (error) {
            console.log(`get Book function error: ${error}`);
            res.status(500).json({message:`Internal Server Error`})
        }
}

export const userbook = async (req,res) =>{
    try {
        const book = await Book.find({user: req.user._id}).sort({ createdAt: -1 });
        res.status(200).json(book)
    } catch (error) {
        console.error(`error in the userbook function error: ${error}`);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const deleteBook = async (req,res) =>{
       try {
             const book = await Book.findById(req.params.id);
             if (!book) {
                return res.status(404).json({message: "Book not Found"})
             }

             if (book.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({message:"Unauthorized"});
             }

             if (book.image && book.image.includes("cloudinaey")) {
                const publicid = book.image.split("/").pop().split(".")[0];
                await cloudinaey.uploader.destroy(publicid);
             }
             await book.deleteOne();
             res.status(200).json({message:"success deleteone a new book"});
        } catch (error) {
            console.log(`delete Book function error: ${error}`);
            res.status(500).json({message:`Internal Server Error`})
        }
}