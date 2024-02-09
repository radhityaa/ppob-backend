import ResponseSuccess from "../response/ResponseSuccess.js"
import { CekSaldoService, DepositSaldoDigiflazzService, DetailDepositSaldoDigiflazzService, GetAllDepositSaldoDigiflazzService, GetDigiflazzService, GetPostpaidService } from "../services/DigiflazzService.js"

export const GetDigiflazzController = async (req, res, next) => {
    try {
        const result = await GetDigiflazzService()
        return ResponseSuccess(res, 'Produk Berhasil Diupdate', result)
    } catch (e) {
        next(e)
    }
}

export const GetPostpaidController = async (req, res, next) => {
    try {
        const result = await GetPostpaidService()
        return ResponseSuccess(res, 'Produk Pascabayar Berhasil Diupdate', result)
    } catch (e) {
        next(e)
    }
}

export const CekSaldoController = async (req, res, next) => {
    try {
        const result = await CekSaldoService()
        return ResponseSuccess(res, 'Berhasil Menampilkan Sisa Saldo', result)
    } catch (e) {
        next(e)
    }
}

export const DepositSaldoDigiflazzController = async (req, res, next) => {
    try {
        const result = await DepositSaldoDigiflazzService(req.user, req.body)
        return ResponseSuccess(res, 'Deposit Digiflazz Berhasil', result)
    } catch (e) {
        next(e)
    }
}

export const GetAllSaldoDigiflazzController = async (req, res, next) => {
    try {
        const result = await GetAllDepositSaldoDigiflazzService(req)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Deposit', result)
    } catch (e) {
        next(e)
    }
}

export const DetailSaldoDigiflazzController = async (req, res, next) => {
    const id = parseInt(req.params.id)
    try {
        const result = await DetailDepositSaldoDigiflazzService(id)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Deposit', result)
    } catch (e) {
        next(e)
    }
}