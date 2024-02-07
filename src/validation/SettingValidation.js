import { body, param } from 'express-validator'

export const createSettingValidation = [
    body('name').notEmpty().withMessage('Nama Harus Diisi'),
    body('desc').notEmpty().withMessage('Keterangan Harus Diisi'),
    body('d1').notEmpty().withMessage('Data 1 Harus Diisi')
]

export const detailSettingValidation = [
    param('id').notEmpty().withMessage('ID Setting Harus Diisi')
]

export const updateSettingValidation = [
    param('id').notEmpty().withMessage('ID Setting Harus Diisi')
]

export const deleteSettingValidation = [
    param('id').notEmpty().withMessage('ID Setting Harus Diisi')
]