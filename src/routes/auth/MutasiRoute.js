import express from 'express'
import validation from '../../validation/validation.js'
import { GetAllMutasiController } from '../../controllers/MutasiController.js'

const mutasiRoute = express.Router()

mutasiRoute.get('/api/mutasi', GetAllMutasiController)

export default mutasiRoute