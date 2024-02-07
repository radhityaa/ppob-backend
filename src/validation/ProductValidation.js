import { body, param } from 'express-validator'

export const detailProdukValidation = [
    param('slug').notEmpty().withMessage('Slug Produk Harus Diisi')
]