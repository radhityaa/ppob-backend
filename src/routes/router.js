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
import activityRoute from './auth/ActivityRoute.js'
import transactionRoute from './auth/TransactionRoute.js'
import postpaidRoute from './auth/PostpaidRoute.js'
import { AuthenticateToken } from '../controllers/AuthController.js'

const router = new express.Router()

// Public Route
router.use(authRoute)
router.use(otpRoute)
router.use(productRoute)
router.use(webhookRoute)

router.get('/api/protected', AuthenticateToken)

// Auth Route
router.use(AuthMiddleware)

router.use(digiflazzRoute)
router.use(settingRoute)
router.use(userRoute)
router.use(depositRoute)
router.use(activityRoute)
router.use(transactionRoute)
router.use(postpaidRoute)

export default router