import { body, param } from 'express-validator'

export const createPostpaidValidation = [
    body('target').notEmpty().withMessage('Target Harus Diisi'),
    body('pin').notEmpty().withMessage('PIN Harus Diisi'),
    body('productId').notEmpty().withMessage('Product ID Harus Diisi'),
]

export const detailPostpaidValidation = [
    param('reference').notEmpty().withMessage('Reference Harus Diisi')
]

export const inqTokenPostpaidValidation = [
    body('target').notEmpty().withMessage('Tujuan Harus Diisi')
]