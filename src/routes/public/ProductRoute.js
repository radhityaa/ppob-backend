import express from 'express'
import { detailProdukValidation } from '../../validation/ProductValidation.js'
import validation from '../../validation/validation.js'
import { DetailProductController, GetAllProductController } from '../../controllers/ProductController.js'

const productRoute = express.Router()

productRoute.get('/api/product', GetAllProductController)
productRoute.get('/api/product/:slug', detailProdukValidation, validation, DetailProductController)

export default productRoute