import { body, param } from 'express-validator'

export const createTopupSaldoValidation = [
    body('amount').notEmpty().withMessage('Jumlah Deposit Harus Diisi'),
    body('bank').notEmpty().withMessage('Bank Harus Diisi'),
    body('owner_name').notEmpty().withMessage('Nama Pemilik Rekening HP Harus Diisi'),
]

export const detailTopupSaldoValidation = [
    param('id').notEmpty().withMessage('ID Harus Diisi')
]