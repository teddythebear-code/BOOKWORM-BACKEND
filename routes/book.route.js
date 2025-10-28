import { Router } from "express";

//* import controller
import {deleteBook, createBook, getBook, userbook} from '../controller/book.controller.js'

//* import middleware 
import { protectRoute } from '../middleware/auth.middleware.js'

const bookRouter = Router()

bookRouter.post('/', protectRoute, createBook)
//? http://localhost:5000/api/book/

bookRouter.get('/', getBook)
//? http://localhost:5000/api/book/

bookRouter.get('/user', userbook)
//? http://localhost:5000/api/book/user

bookRouter.delete('/:id', deleteBook)
//? http://localhost:5000/api/book/

export default bookRouter 