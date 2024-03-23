import express from 'express'
import { ApprovalDepositController, CancelDepositController, CreateDepositController, DetailDepositController, GetAllDepositController, GetAllDepositUserController, GetStatusController, UpdateDepositeController } from '../../controllers/DepositController.js'
import { cancelDepositValidation, createDepositValidation, detailDepositValidation, updateDepositValidation } from '../../validation/DepositValidation.js'
import validation from '../../validation/validation.js'
import { AdminMiddleware } from '../../middleware/AdminMiddleware.js'

const depositRoute = express.Router()

depositRoute.get('/api/deposit-admin', AdminMiddleware, GetAllDepositController)
depositRoute.get('/api/deposit', GetAllDepositUserController)
depositRoute.patch('/api/deposit/:reference', AdminMiddleware, updateDepositValidation, validation, UpdateDepositeController)
depositRoute.post('/api/deposit/approval/:reference', AdminMiddleware, updateDepositValidation, validation, ApprovalDepositController)

depositRoute.post('/api/deposit', createDepositValidation, validation, CreateDepositController)
depositRoute.get('/api/deposit/:reference', detailDepositValidation, validation, DetailDepositController)
depositRoute.patch('/api/deposit/cancel/:reference', cancelDepositValidation, validation, CancelDepositController)
depositRoute.get('/api/deposit/status/:reference', cancelDepositValidation, validation, GetStatusController)

export default depositRoute