import express from 'express'
import { WebhookDigiflazzController, WebhookTripayController } from '../../controllers/WebhookController.js'

const webhookRoute = express.Router()

webhookRoute.post('/api/callback/tripay', WebhookTripayController)
webhookRoute.post('/api/callback/digiflazz', WebhookDigiflazzController)

export default webhookRoute