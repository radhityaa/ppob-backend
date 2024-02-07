import { body, param } from 'express-validator'

export const createUserValidation = [
    body('name').notEmpty().withMessage('Nama Harus Diisi'),
    body('username').notEmpty().withMessage('Username Harus Diisi'),
    body('password').notEmpty().withMessage('Password Harus Diisi'),
    body('pin').notEmpty().withMessage('Pin Harus Diisi'),
    body('email').notEmpty().withMessage('Email Harus Diisi'),
    body('phone').notEmpty().withMessage('Nomor HP Harus Diisi'),
]

export const detailUserValidation = [
    param('username').notEmpty().withMessage('Username Harus Diisi')
]

export const updateUserValidation = [
    param('username').notEmpty().withMessage('Username Harus Diisi')
]

export const deleteUserValidation = [
    param('username').notEmpty().withMessage('Username Harus Diisi')
]