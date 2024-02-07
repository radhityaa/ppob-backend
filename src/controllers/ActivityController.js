import ResponseSuccess from "../response/ResponseSuccess.js"
import { GetAllActivityService } from "../services/ActivityService.js"

export const GetAllActivityController = async (req, res, next) => {
    try {
        const result = await GetAllActivityService(req.user.id)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Aktifitas', result)
    } catch (e) {
        next(e)
    }
}