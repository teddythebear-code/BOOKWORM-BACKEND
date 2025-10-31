import { Router } from "express";

//* import controller
import {deleteBook, createBook, getBook, userbook} from '../controller/book.controller.js'

//* import middleware 
import { protectRoute } from '../middleware/auth.middleware.js'

const bookRouter = Router()

bookRouter.post('/', protectRoute, createBook)
// development
//? http://localhost:5000/api/book/
// production 
//? https://bookworm-backend-oyv7.onrender.com/api/book/

bookRouter.get('/', getBook)
// development
//? http://localhost:5000/api/book/
// production 
//? https://bookworm-backend-oyv7.onrender.com/api/book/

bookRouter.get('/user', userbook)
// development
//? http://localhost:5000/api/book/user
// production 
//? https://bookworm-backend-oyv7.onrender.com/api/book/user

bookRouter.delete('/:id', deleteBook)
// development
//? http://localhost:5000/api/book/:id
// production 
//? https://bookworm-backend-oyv7.onrender.com/api/book/:id

export default bookRouter 