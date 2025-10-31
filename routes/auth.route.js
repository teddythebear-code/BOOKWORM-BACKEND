import { Router } from "express";

import {Register, login } from '../controller/auth.controller.js';

const authRouter = Router();

authRouter.post('/register', Register);
// development
//? http://localhost:5000/api/auth/register 
// production 
//? https://bookworm-backend-oyv7.onrender.com/api/auth/register 

authRouter.post('/login', login);
// development
//? http://localhost:5000/api/auth/login
// production 
//? https://bookworm-backend-oyv7.onrender.com/api/auth/login

// authRouter.get('/logout', logout);
// // development
// //? http://localhost:5000/api/auth/login
// // production 
// //? https://bookworm-backend-oyv7.onrender.com/api/auth/logout

export default authRouter 