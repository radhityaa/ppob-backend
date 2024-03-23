import { body, param } from 'express-validator'

export const createCategoryValidation = [
    body('name').notEmpty().withMessage('Nama Kategori Harus Diisi')
]

export const detailCategoryValidation = [
    param('slug').notEmpty().withMessage('Slug Harus Diisi')
]

export const updateCategoryValidation = [
    body('name').notEmpty().withMessage('Nama Kategori Harus Diisi')
]

export const deleteCategoryValdiation = [
    param('slug').notEmpty().withMessage('Slug Harus Diisi')
]