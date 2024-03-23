import express from 'express'
import { CreateCategoryController, DeleteCategoryController, UpdateCategoryController } from '../../controllers/CategoryController.js'
import { createCategoryValidation, deleteCategoryValdiation, updateCategoryValidation } from '../../validation/CategoryValidation.js'
import validation from '../../validation/validation.js'

const categoryAuthRoute = express.Router()

categoryAuthRoute.post('/api/category', createCategoryValidation, validation, CreateCategoryController)
categoryAuthRoute.patch('/api/category/:slug', updateCategoryValidation, validation, UpdateCategoryController)
categoryAuthRoute.delete('/api/category/:slug', deleteCategoryValdiation, validation, DeleteCategoryController)

export default categoryAuthRoute