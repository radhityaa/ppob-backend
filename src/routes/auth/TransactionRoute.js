import express from 'express'
import { createTransactionValidation, detailTransactionValidation } from '../../validation/TransactionValidation.js'
import validation from '../../validation/validation.js'
import { CreateTransactionController, DetailTransactionController, GetAllTransactionController, GetUserTransactionController } from '../../controllers/TransactionController.js'
import { AdminMiddleware } from '../../middleware/AdminMiddleware.js'

const transactionRoute = express.Router()

transactionRoute.get('/api/transaction/admin', AdminMiddleware, GetAllTransactionController)

transactionRoute.get('/api/transaction', GetUserTransactionController)
transactionRoute.get('/api/transaction/:reference', detailTransactionValidation, validation, DetailTransactionController)
transactionRoute.post('/api/transaction', createTransactionValidation, validation, CreateTransactionController)

export default transactionRoute