import express from 'express'
import { GetChannelsController } from '../../controllers/TripayController.js'

const tripayRoute = express.Router()

tripayRoute.get('/api/tripay/channels', GetChannelsController)

export default tripayRoute