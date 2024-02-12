import express from 'express'
import { CreateUserController, DeleteUserController, DetailUserController, GetAllUsersController, UpdateUserController, UserCurrentController } from '../../controllers/UserController.js'
import { AdminMiddleware } from '../../middleware/AdminMiddleware.js'
import { createUserValidation, deleteUserValidation, detailUserValidation, updateUserValidation } from '../../validation/UserValidation.js'
import validation from '../../validation/validation.js'

const userRoute = express.Router()

userRoute.post('/api/users', AdminMiddleware, createUserValidation, validation, CreateUserController)
userRoute.get('/api/users', AdminMiddleware, GetAllUsersController)
userRoute.get('/api/users/current', UserCurrentController)
userRoute.get('/api/users/:username', detailUserValidation, validation, DetailUserController)
userRoute.patch('/api/users/:username', updateUserValidation, validation, UpdateUserController)
userRoute.delete('/api/users/:username', AdminMiddleware, deleteUserValidation, validation, DeleteUserController)

export default userRoute