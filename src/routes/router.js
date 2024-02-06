import express from 'express'
import authRoute from './public/AuthRoute.js'
import otpRoute from './public/OtpRoute.js'

const router = new express.Router()

// Public Route
router.use(authRoute)
router.use(otpRoute)

// Auth Route
export default router