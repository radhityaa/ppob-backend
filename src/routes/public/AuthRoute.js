import express from 'express'
import { forgotValidation, loginValidation, registerValidation } from '../../validation/AuthValidation.js'
import validation from '../../validation/validation.js'
import { ForgotController, LoginController, RegisterController } from '../../controllers/AuthController.js'

const authRoute = express.Router()

authRoute.post('/api/auth/register', registerValidation, validation, RegisterController)
authRoute.post('/api/auth/login', loginValidation, validation, LoginController)
authRoute.post('/api/auth/forgot', forgotValidation, validation, ForgotController)

export default authRoute