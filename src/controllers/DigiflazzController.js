import ResponseSuccess from "../response/ResponseSuccess.js"
import { GetDigiflazzService } from "../services/DigiflazzService.js"

export const GetDigiflazzController = async (req, res, next) => {
    try {
        const result = await GetDigiflazzService()
        return ResponseSuccess(res, 'Produk Berhasil Diupdate', result)
    } catch (e) {
        next(e)
    }
}