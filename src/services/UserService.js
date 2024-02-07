import User from "../models/UserModel.js"
import { ResponseError } from "../response/ResponseError.js"
import bcrypt from 'bcrypt'

export const CreateUserService = async (request) => {
    const data = await User.findOne({
        where: {
            username: request.username,
            email: request.email
        }
    })

    if (data) throw new ResponseError(400, 'Username / Email Sudah Terdaftar')

    request.password = await bcrypt.hash(request.password, 12)
    request.pin = await bcrypt.hash(request.pin, 12)

    return User.create(request)
}

export const GetAllUsersService = async (request) => {
    // Pagination Parameters
    const page = parseInt(request.query.page, 10) || 1
    const limit = parseInt(request.query.limit, 10) || 10
    const startIndex = (page - 1) * limit

    // Sorting Parameters
    const isVerif = request.query.isVerif
    const status = request.query.status

    const whereConditions = {}

    if (isVerif !== undefined) {
        whereConditions.isVerif = isVerif
    }

    if (status !== undefined) {
        whereConditions.status = status
    }

    // Sorting Options
    const orderOptions = [['createdAt', 'desc']]

    // Query
    const { count, rows } = await User.findAndCountAll({
        attributes: {
            exclude: ['password', 'pin']
        },
        where: whereConditions,
        order: orderOptions,
        limit: limit,
        offset: startIndex
    })

    const result = {}

    if (startIndex + limit < count) {
        result.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        result.previous = {
            page: page - 1,
            limit: limit
        }
    }

    result.data = rows

    return result
}

export const DetailUserService = async (username) => {
    const data = await User.findOne({ where: { username: username } })

    if (!data) throw new ResponseError(404, 'Data User Tidak Ditemukan')

    return data
}

export const UpdateUserService = async (username, request) => {
    const data = await User.findOne({ where: { username: username } })

    if (!data) throw new ResponseError(404, 'Data User Tidak Ditemukan')

    if (request.password) {
        request.password = await bcrypt.hash(request.password, 12)
    }

    if (request.pin) {
        request.pin = await bcrypt.hash(request.pin, 12)
    }

    return data.update(request)
}

export const DeleteUserService = async (username) => {
    const data = await User.findOne({ where: { username: username } })

    if (!data) throw new ResponseError(404, 'Data User Tidak Ditemukan')

    return data.destroy()
}