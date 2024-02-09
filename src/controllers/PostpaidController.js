import ResponseSuccess from "../response/ResponseSuccess.js"
import { CreatePostpaidService, DetailPostpaidService, GetAllPostpaidService, GetUserPostpaidService, InqPostpaidService } from "../services/PostpaidService.js"

export const InqPostpaidController = async (req, res, next) => {
    try {
        const result = await InqPostpaidService(req.body)
        return ResponseSuccess(res, 'Berhasil Melakukan Pengecekan Tagihan', result)
    } catch (e) {
        next(e)
    }
}

export const CreatePostpaidController = async (req, res, next) => {
    try {
        const result = await CreatePostpaidService(req.user, req.body)
        return ResponseSuccess(res, 'Berhasil Melakukan Pesanan', result)
    } catch (e) {
        next(e)
    }
}

export const GetAllPostpaidController = async (req, res, next) => {
    try {
        const result = await GetAllPostpaidService(req)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Pascabayar', result)
    } catch (e) {
        next(e)
    }
}

export const GetUserPostpaidController = async (req, res, next) => {
    try {
        const result = await GetUserPostpaidService(req.user, req)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Pascabayar', result)
    } catch (e) {
        next(e)
    }
}

export const DetailPostpaidController = async (req, res, next) => {
    try {
        const result = await DetailPostpaidService(req.params.reference)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Pascabayar', result)
    } catch (e) {
        next(e)
    }
}