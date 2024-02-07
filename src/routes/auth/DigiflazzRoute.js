import express from 'express'
import { GetDigiflazzController } from '../../controllers/DigiflazzController.js'

const digiflazzRoute = express.Router()

digiflazzRoute.post('/api/digiflazz/get', GetDigiflazzController)

export default digiflazzRoute