import express from 'express'
import { ApprovalDepositController, CreateDepositController, UpdateDepositeController } from '../../controllers/DepositController.js'
import { createDepositValidation, updateDepositValidation } from '../../validation/DepositValidation.js'
import validation from '../../validation/validation.js'
import { AdminMiddleware } from '../../middleware/AdminMiddleware.js'

const depositRoute = express.Router()

depositRoute.post('/api/deposit', createDepositValidation, validation, CreateDepositController)
depositRoute.patch('/api/deposit/:reference', AdminMiddleware, updateDepositValidation, validation, UpdateDepositeController)
depositRoute.post('/api/deposit/approval/:reference', AdminMiddleware, updateDepositValidation, validation, ApprovalDepositController)

export default depositRoute