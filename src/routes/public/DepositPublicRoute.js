import express from 'express'
import { DetailDepositController } from '../../controllers/DepositController.js'
import { detailDepositValidation } from '../../validation/DepositValidation.js'
import validation from '../../validation/validation.js'

const depositPublicRoute = express.Router()

depositPublicRoute.get('/api/deposit/:reference', detailDepositValidation, validation, DetailDepositController)

export default depositPublicRoute