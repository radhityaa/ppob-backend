import express from 'express'
import { OtpValidationController, SendOtpController } from '../../controllers/OtpController.js'
import { otpSendValidation, otpValidation } from '../../validation/OtpValidation.js'
import validation from '../../validation/validation.js'

const otpRoute = express.Router()

otpRoute.post('/api/otp/send', otpSendValidation, validation, SendOtpController)
otpRoute.post('/api/otp/validation', otpValidation, validation, OtpValidationController)

export default otpRoute