import express from 'express'
import { GetAllActivityController } from '../../controllers/ActivityController.js'

const activityRoute = express.Router()

activityRoute.get('/api/activity', GetAllActivityController)

export default activityRoute