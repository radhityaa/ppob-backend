import ResponseSuccess from "../response/ResponseSuccess.js"
import { GetChannelsService } from "../services/TripayService.js"

export const GetChannelsController = async (req, res, next) => {
    try {
        const result = await GetChannelsService()
        return ResponseSuccess(res, 'Daftar Metode Pembayaran', result)
    } catch (e) {
        next(e)
    }
}