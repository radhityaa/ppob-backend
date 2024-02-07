import express from 'express'
import authRoute from './public/AuthRoute.js'
import otpRoute from './public/OtpRoute.js'
import { AuthMiddleware } from '../middleware/AuthMiddleware.js'
import digiflazzRoute from './auth/DigiflazzRoute.js'
import settingRoute from './auth/SettingRoute.js'

const router = new express.Router()

// Public Route
router.use(authRoute)
router.use(otpRoute)

// Auth Route
router.use(AuthMiddleware)

router.use(digiflazzRoute)
router.use(settingRoute)
export default router