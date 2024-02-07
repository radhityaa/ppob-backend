import express from 'express'
import { GetAllUsersController } from '../../controllers/UserController.js'
import { AdminMiddleware } from '../../middleware/AdminMiddleware.js'

const userRoute = express.Router()

userRoute.get('/api/users', AdminMiddleware, GetAllUsersController)

export default userRoute