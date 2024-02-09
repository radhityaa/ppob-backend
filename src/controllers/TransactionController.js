import ResponseSuccess from "../response/ResponseSuccess.js"
import { CreateTransactionService, DetailTransactionService, GetAllTransactionService, GetUserTransactionService } from "../services/TransactionService.js"

export const CreateTransactionController = async (req, res, next) => {
    try {
        const result = await CreateTransactionService(req.user, req.body)
        return ResponseSuccess(res, 'Berhasil Melakukan Pesanan', result)
    } catch (e) {
        next(e)
    }
}

export const GetAllTransactionController = async (req, res, next) => {
    try {
        const result = await GetAllTransactionService(req)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Transaksi', result)
    } catch (e) {
        next(e)
    }
}

export const GetUserTransactionController = async (req, res, next) => {
    try {
        const result = await GetUserTransactionService(req.user, req)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Transaksi', result)
    } catch (e) {
        next(e)
    }
}

export const DetailTransactionController = async (req, res, next) => {
    try {
        const result = await DetailTransactionService(req.params.reference)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Transaksi', result)
    } catch (e) {
        next(e)
    }
}