import express from 'express'
import { forgotValidation, loginValidation, registerValidation, resetPasswordValidation } from '../../validation/AuthValidation.js'
import validation from '../../validation/validation.js'
import { ForgotController, LoginController, RegisterController, ResetPasswordController } from '../../controllers/AuthController.js'

const authRoute = express.Router()

authRoute.post('/api/auth/register', registerValidation, validation, RegisterController)
authRoute.post('/api/auth/login', loginValidation, validation, LoginController)
authRoute.post('/api/auth/forgot', forgotValidation, validation, ForgotController)
authRoute.post('/api/auth/password-reset/:userId/:token', resetPasswordValidation, validation, ResetPasswordController)

export default authRoute