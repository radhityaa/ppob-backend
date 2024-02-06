import { body } from 'express-validator'

export const otpValidation = [
    body('email').notEmpty().withMessage('Email Harus Diisi'),
    body('username').notEmpty().withMessage('Username Harus Diisi'),
    body('code').notEmpty().withMessage('OTP Harus Diisi')
]