import express from 'express'
import { WebhookTripayController } from '../../controllers/WebhookController.js'

const webhookRoute = express.Router()

webhookRoute.post('/api/callback/tripay', WebhookTripayController)

export default webhookRoute