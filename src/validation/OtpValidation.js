import { body } from 'express-validator'

export const otpSendValidation = [
    body('email').notEmpty().withMessage('Email Harus Diisi')
]

export const otpValidation = [
    body('email').notEmpty().withMessage('Email Harus Diisi')
]