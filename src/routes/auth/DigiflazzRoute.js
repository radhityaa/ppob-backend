import express from 'express'
import { GetDigiflazzController, GetPostpaidController } from '../../controllers/DigiflazzController.js'

const digiflazzRoute = express.Router()

digiflazzRoute.post('/api/digiflazz/get', GetDigiflazzController)
digiflazzRoute.post('/api/digiflazz/postpaid/get', GetPostpaidController)

export default digiflazzRoute