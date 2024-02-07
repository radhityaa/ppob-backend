import express from 'express'
import { AuthMiddleware } from '../middleware/AuthMiddleware.js'
import depositRoute from './auth/DepositRoute.js'
import digiflazzRoute from './auth/DigiflazzRoute.js'
import settingRoute from './auth/SettingRoute.js'
import userRoute from './auth/UserRoute.js'
import authRoute from './public/AuthRoute.js'
import otpRoute from './public/OtpRoute.js'
import productRoute from './public/ProductRoute.js'
import webhookRoute from './public/WebhookRoute.js'

const router = new express.Router()

// Public Route
router.use(authRoute)
router.use(otpRoute)
router.use(productRoute)
router.use(webhookRoute)

// Auth Route
router.use(AuthMiddleware)

router.use(digiflazzRoute)
router.use(settingRoute)
router.use(userRoute)
router.use(depositRoute)
export default router