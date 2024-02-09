import express from 'express'
import { CekSaldoController, GetDigiflazzController, GetPostpaidController } from '../../controllers/DigiflazzController.js'
import { AdminMiddleware } from '../../middleware/AdminMiddleware.js'

const digiflazzRoute = express.Router()

digiflazzRoute.post('/api/digiflazz/get', AdminMiddleware, GetDigiflazzController)
digiflazzRoute.post('/api/digiflazz/postpaid/get', AdminMiddleware, GetPostpaidController)
digiflazzRoute.post('/api/digiflazz/cek-saldo', AdminMiddleware, CekSaldoController)

export default digiflazzRoute