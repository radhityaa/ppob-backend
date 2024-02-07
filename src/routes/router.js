import express from 'express'
import authRoute from './public/AuthRoute.js'
import otpRoute from './public/OtpRoute.js'
import { AuthMiddleware } from '../middleware/AuthMiddleware.js'
import digiflazzRoute from './auth/DigiflazzRoute.js'
import settingRoute from './auth/SettingRoute.js'
import productRoute from './public/ProductRoute.js'
import userRoute from './auth/UserRoute.js'
import depositRoute from './auth/DepositRoute.js'
import depositPublicRoute from './public/DepositPublicRoute.js'

const router = new express.Router()

// Public Route
router.use(authRoute)
router.use(otpRoute)
router.use(productRoute)
router.use(depositPublicRoute)

// Auth Route
router.use(AuthMiddleware)

router.use(digiflazzRoute)
router.use(settingRoute)
router.use(userRoute)
router.use(depositRoute)
export default router