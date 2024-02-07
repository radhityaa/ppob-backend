import express from 'express'
import { CreateSettingController, DeleteSettingController, DetailSettingController, GetAllSettingController, UpdateSettingController } from '../../controllers/SettingController.js'
import { createSettingValidation, deleteSettingValidation, detailSettingValidation, updateSettingValidation } from '../../validation/SettingValidation.js'
import validation from '../../validation/validation.js'

const settingRoute = express.Router()

settingRoute.get('/api/setting', GetAllSettingController)
settingRoute.post('/api/setting', createSettingValidation, validation, CreateSettingController)
settingRoute.get('/api/setting/:id', detailSettingValidation, validation, DetailSettingController)
settingRoute.patch('/api/setting/:id', updateSettingValidation, validation, UpdateSettingController)
settingRoute.delete('/api/setting/:id', deleteSettingValidation, validation, DeleteSettingController)

export default settingRoute