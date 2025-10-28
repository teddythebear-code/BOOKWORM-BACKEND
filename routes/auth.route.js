import { Router } from "express";

import {Register, login } from '../controller/auth.controller.js'

const authRouter = Router()

authRouter.post('/register', Register)
//? http://localhost:5000/api/auth/register

authRouter.post('/login', login)
//? http://localhost:5000/api/auth/login

export default authRouter 