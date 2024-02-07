import { body, param } from 'express-validator'

export const createDepositValidation = [
    body('nominal').notEmpty().withMessage('Nominal Harus Diisi'),
    body('method').notEmpty().withMessage('Method Harus Diisi'),
]

export const detailDepositValidation = [
    param('reference').notEmpty().withMessage('Reference Harus Diisi')
]

export const updateDepositValidation = [
    param('reference').notEmpty().withMessage('Reference Harus Diisi')
]