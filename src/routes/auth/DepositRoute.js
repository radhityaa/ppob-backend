import express from 'express'
import { ApprovalDepositController, CreateDepositController, DetailDepositController, GetAllDepositController, UpdateDepositeController } from '../../controllers/DepositController.js'
import { createDepositValidation, detailDepositValidation, updateDepositValidation } from '../../validation/DepositValidation.js'
import validation from '../../validation/validation.js'
import { AdminMiddleware } from '../../middleware/AdminMiddleware.js'

const depositRoute = express.Router()

depositRoute.get('/api/deposit', AdminMiddleware, GetAllDepositController)
depositRoute.patch('/api/deposit/:reference', AdminMiddleware, updateDepositValidation, validation, UpdateDepositeController)
depositRoute.post('/api/deposit/approval/:reference', AdminMiddleware, updateDepositValidation, validation, ApprovalDepositController)

depositRoute.post('/api/deposit', createDepositValidation, validation, CreateDepositController)
depositRoute.get('/api/deposit/:reference', detailDepositValidation, validation, DetailDepositController)

export default depositRoute