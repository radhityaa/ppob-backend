import { body, param } from 'express-validator'
import { ResponseError } from 'xendit-node'

export const createDepositValidation = [
    body('nominal').notEmpty().withMessage('Nominal Harus Diisi').custom((value) => {
        if (value < 50000) {
            throw new ResponseError(400, 'Nominal Deposit Minimal Rp. 50.000')
        }

        return true
    }),
    body('method').notEmpty().withMessage('Method Harus Diisi'),
]

export const detailDepositValidation = [
    param('reference').notEmpty().withMessage('Reference Harus Diisi')
]

export const updateDepositValidation = [
    param('reference').notEmpty().withMessage('Reference Harus Diisi')
]