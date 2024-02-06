import express from 'express'
import { OtpValidationController } from '../../controllers/OtpController.js'
import { otpValidation } from '../../validation/OtpValidation.js'
import validation from '../../validation/validation.js'

const otpRoute = express.Router()

otpRoute.post('/api/otp/validation', otpValidation, validation, OtpValidationController)

export default otpRoute