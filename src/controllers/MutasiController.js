import ResponseSuccess from "../response/ResponseSuccess.js"
import { GetAllMutasiService } from "../services/MutasiService.js"

export const GetAllMutasiController = async (req, res, next) => {
    try {
        const result = await GetAllMutasiService(req.user)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Mutasi', result)
    } catch (e) {
        next(e)
    }
}