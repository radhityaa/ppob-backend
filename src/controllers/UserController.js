import ResponseSuccess from "../response/ResponseSuccess.js"
import { GetAllUsersService } from "../services/UserService.js"

export const GetAllUsersController = async (req, res, next) => {
    try {
        const result = await GetAllUsersService(req)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Users', result)
    } catch (e) {
        next(e)
    }
}