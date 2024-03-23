import express from 'express'
import { DetailCategoryController, GetCategoryController } from '../../controllers/CategoryController.js'
import { detailCategoryValidation } from '../../validation/CategoryValidation.js'
import validation from '../../validation/validation.js'

const categoryRoute = express.Router()

categoryRoute.get('/api/category', GetCategoryController)
categoryRoute.get('/api/category/:slug', detailCategoryValidation, validation, DetailCategoryController)

export default categoryRoute