import express from 'express'
import { loginValidation, registerValidation } from '../../validation/AuthValidation.js'
import validation from '../../validation/validation.js'
import { LoginController, RegisterController } from '../../controllers/AuthController.js'

const authRoute = express.Router()

authRoute.post('/api/auth/register', registerValidation, validation, RegisterController)
authRoute.post('/api/auth/login', loginValidation, validation, LoginController)

export default authRoute