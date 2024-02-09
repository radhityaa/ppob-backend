import { body, param } from 'express-validator'

export const createTransactionValidation = [
    body('target').notEmpty().withMessage('Target Harus Diisi'),
    body('pin').notEmpty().withMessage('PIN Harus Diisi'),
    body('productId').notEmpty().withMessage('Product ID Harus Diisi'),
]

export const detailTransactionValidation = [
    param('reference').notEmpty().withMessage('Reference Harus Diisi')
]

export const updateSettingValidation = [
    param('id').notEmpty().withMessage('ID Setting Harus Diisi')
]

export const deleteSettingValidation = [
    param('id').notEmpty().withMessage('ID Setting Harus Diisi')
]