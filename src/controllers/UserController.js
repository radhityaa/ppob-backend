import ResponseSuccess from "../response/ResponseSuccess.js"
import { CreateUserService, DeleteUserService, DetailUserService, GetAllUsersService, LogoutService, UpdateUserService, UserCurrentService } from "../services/UserService.js"

export const CreateUserController = async (req, res, next) => {
    try {
        const result = await CreateUserService(req.body)
        return ResponseSuccess(res, 'User Berhasil Dibuat', result)
    } catch (e) {
        next(e)
    }
}

export const GetAllUsersController = async (req, res, next) => {
    try {
        const result = await GetAllUsersService(req)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Users', result)
    } catch (e) {
        next(e)
    }
}

export const DetailUserController = async (req, res, next) => {
    try {
        const result = await DetailUserService(req.params.username)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data User', result)
    } catch (e) {
        next(e)
    }
}

export const UserCurrentController = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    try {
        const result = await UserCurrentService(token)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data User', result)
    } catch (e) {
        next(e)
    }
}

export const UpdateUserController = async (req, res, next) => {
    const { username } = req.params

    try {
        const result = await UpdateUserService(username, req.body)
        return ResponseSuccess(res, 'User Berhasil Diperbaharui', result)
    } catch (e) {
        next(e)
    }
}

export const DeleteUserController = async (req, res, next) => {
    const { username } = req.params

    try {
        const result = await DeleteUserService(username)
        return ResponseSuccess(res, 'User Berhasil Dihapus', result)
    } catch (e) {
        next(e)
    }
}

export const LogoutController = async (req, res, next) => {
    try {
        const result = await LogoutService(req)
        res.clearCookie('token')
        return ResponseSuccess(res, 'Berhasil Keluar', result)
    } catch (e) {
        next(e)
    }
}