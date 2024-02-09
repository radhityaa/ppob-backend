import express from 'express'
import { CekSaldoController, DepositSaldoDigiflazzController, DetailSaldoDigiflazzController, GetAllSaldoDigiflazzController, GetDigiflazzController, GetPostpaidController } from '../../controllers/DigiflazzController.js'
import { AdminMiddleware } from '../../middleware/AdminMiddleware.js'
import { createTopupSaldoValidation, detailTopupSaldoValidation } from '../../validation/TopupSaldoValidation.js'
import validation from '../../validation/validation.js'

const digiflazzRoute = express.Router()

digiflazzRoute.post('/api/digiflazz/get', AdminMiddleware, GetDigiflazzController)
digiflazzRoute.post('/api/digiflazz/postpaid/get', AdminMiddleware, GetPostpaidController)
digiflazzRoute.post('/api/digiflazz/cek-saldo', AdminMiddleware, CekSaldoController)

digiflazzRoute.get('/api/digiflazz/deposit', AdminMiddleware, GetAllSaldoDigiflazzController)
digiflazzRoute.post('/api/digiflazz/deposit', AdminMiddleware, createTopupSaldoValidation, validation, DepositSaldoDigiflazzController)
digiflazzRoute.get('/api/digiflazz/deposit/:id', AdminMiddleware, detailTopupSaldoValidation, validation, DetailSaldoDigiflazzController)

export default digiflazzRoute