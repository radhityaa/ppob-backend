import express from 'express'
import { registerValidation } from '../../validation/AuthValidation.js'
import validation from '../../validation/validation.js'
import { RegisterController } from '../../controllers/AuthController.js'

const authRoute = express.Router()

authRoute.post('/api/auth/register', registerValidation, validation, RegisterController)

export default authRoute