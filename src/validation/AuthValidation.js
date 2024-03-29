import { body, param } from 'express-validator'

export const registerValidation = [
    body('name').notEmpty().withMessage('Nama Harus Diisi'),
    body('email').notEmpty().withMessage('Email Harus Diisi'),
    body('username').notEmpty().withMessage('Username Harus Diisi'),
    body('phone').notEmpty().withMessage('Nomor HP Harus Diisi'),
    body('password').notEmpty().withMessage('Password Harus Diisi'),
    body('pin').notEmpty().withMessage('Pin Harus Diisi')
]

export const loginValidation = [
    body('username').notEmpty().withMessage('Username Harus Diisi'),
    body('password').notEmpty().withMessage('Password Harus Diisi'),
]

export const forgotValidation = [
    body('email').notEmpty().withMessage('Email Harus Diisi'),
]

export const resetPasswordValidation = [
    param('userId').notEmpty().withMessage('User ID Harus Diisi'),
    param('token').notEmpty().withMessage('Token Harus Diisi'),
    body('password').notEmpty().withMessage('Password Harus Diisi'),
]