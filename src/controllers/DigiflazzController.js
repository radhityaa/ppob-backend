import ResponseSuccess from "../response/ResponseSuccess.js"
import { CekSaldoService, GetDigiflazzService, GetPostpaidService } from "../services/DigiflazzService.js"

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