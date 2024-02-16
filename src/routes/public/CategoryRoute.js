import express from 'express'
import { GetCategoryController } from '../../controllers/CategoryController.js'

const categoryRoute = express.Router()

categoryRoute.get('/api/category/:category', GetCategoryController)

export default categoryRoute