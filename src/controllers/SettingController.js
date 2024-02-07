import ResponseSuccess from "../response/ResponseSuccess.js"
import { CreateSettingService, DeleteSettingService, DetailSettingService, GetAllSettingService, UpdateSettingService } from "../services/SettingService.js"

export const GetAllSettingController = async (req, res, next) => {
    try {
        const result = await GetAllSettingService()
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Setting', result)
    } catch (e) {
        next(e)
    }
}

export const CreateSettingController = async (req, res, next) => {
    try {
        const result = await CreateSettingService(req.body)
        return ResponseSuccess(res, 'Berhasil Menambahkan Data Setting', result)
    } catch (e) {
        next(e)
    }
}

export const DetailSettingController = async (req, res, next) => {
    try {
        const result = await DetailSettingService(req.params.id)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data', result)
    } catch (e) {
        next(e)
    }
}

export const UpdateSettingController = async (req, res, next) => {
    try {
        const result = await UpdateSettingService(req.params.id, req.body)
        return ResponseSuccess(res, 'Data Setting Berhasil Diubah', result)
    } catch (e) {
        next(e)
    }
}

export const DeleteSettingController = async (req, res, next) => {
    try {
        const result = await DeleteSettingService(req.params.id)
        return ResponseSuccess(res, 'Data Setting Berhasil Dihapus', result)
    } catch (e) {
        next(e)
    }
}