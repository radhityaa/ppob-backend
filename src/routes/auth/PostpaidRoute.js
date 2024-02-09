import express from 'express'
import { CreatePostpaidController, DetailPostpaidController, GetAllPostpaidController, GetUserPostpaidController, InqPostpaidController } from '../../controllers/PostpaidController.js'
import { AdminMiddleware } from '../../middleware/AdminMiddleware.js'
import { createPostpaidValidation, detailPostpaidValidation } from '../../validation/PostpaidValidation.js'
import validation from '../../validation/validation.js'

const postpaidRoute = express.Router()

postpaidRoute.get('/api/postpaid/admin', AdminMiddleware, GetAllPostpaidController)

postpaidRoute.get('/api/postpaid', GetUserPostpaidController)
postpaidRoute.get('/api/postpaid/:reference', detailPostpaidValidation, validation, DetailPostpaidController)

postpaidRoute.post('/api/postpaid/inq', createPostpaidValidation, validation, InqPostpaidController)
postpaidRoute.post('/api/postpaid', createPostpaidValidation, validation, CreatePostpaidController)

export default postpaidRoute