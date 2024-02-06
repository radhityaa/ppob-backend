import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'
import router from '../routes/router.js'
import { ErrorMiddleware } from '../middleware/ErrorMiddleware.js'

export const web = express()
web.use(express.json())
web.use(fileUpload())
web.use('/images', express.static('images'))
web.use(cookieParser())
web.use(cors())

web.use(router)

web.use(ErrorMiddleware)