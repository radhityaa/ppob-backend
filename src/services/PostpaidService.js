import Postpaid from "../models/PostpaidModel.js"
import ProductPostpaid from "../models/ProductPostpaidModel.js"
import User from "../models/UserModel.js"
import { ResponseError } from "../response/ResponseError.js"
import { DigiflazzInqPasca, DigiflazzPostpaid } from "../utils/Digiflazz.js"
import bcrypt from "bcrypt"

export const InqPostpaidService = async (request) => {
    const productId = request.productId
    const target = request.target

    const product = await ProductPostpaid.findByPk(productId)
    if (!product) throw new ResponseError(404, 'Produk Tidak Ditemukan')

    const data = {
        reference: `digi-inqpasca-${Date.now()}`,
        target,
        productId
    }

    return DigiflazzInqPasca(data)
}

export const CreatePostpaidService = async (user, request) => {
    const productId = request.productId
    const target = request.target
    const userId = user.id
    const pin = request.pin

    const userData = await User.findByPk(userId)
    const product = await ProductPostpaid.findByPk(productId)

    if (!userData) throw new ResponseError(404, 'User Tidak Ditemukan')
    if (!product) throw new ResponseError(404, 'Produk Tidak Ditemukan')

    const data = {
        reference: `digi-inqpasca-${Date.now()}`,
        target,
        productId
    }

    const pasca = await DigiflazzInqPasca(data)

    if (userData.saldo <= pasca.price) throw new ResponseError(400, 'Saldo Anda Tidak Cukup')

    // Cek PIN Trx
    const cekPin = await bcrypt.compare(pin, userData.pin)
    if (!cekPin) throw new ResponseError(400, 'PIN Anda Salah')

    const detail = {
        reference: `digi-pasca-${Date.now()}`,
        target,
        userId,
        productId
    }

    const result = await DigiflazzPostpaid(detail)

    if (result.status !== 'Gagal') {
        await userData.update({
            saldo: userData.saldo - pasca.price
        })
    }

    return result
}

export const GetAllPostpaidService = async (request) => {
    // Pagination Parameters
    const page = parseInt(request.query.page, 10) || 1
    const limit = parseInt(request.query.limit, 10) || 10
    const startIndex = (page - 1) * limit

    // Filter Parameters
    const status = request.query.status

    // Prepare the where conditions based on filters
    const whereConditions = {}

    if (status !== undefined) {
        whereConditions.status = status
    }

    // Sorting Options
    const orderOptions = [['createdAt', 'desc']]

    // Query
    const { count, rows } = await Postpaid.findAndCountAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['password', 'pin']
                }
            }
        ],
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

export const GetUserPostpaidService = async (user, request) => {
    // Pagination Parameters
    const page = parseInt(request.query.page, 10) || 1
    const limit = parseInt(request.query.limit, 10) || 10
    const startIndex = (page - 1) * limit

    // Filter Parameters
    const status = request.query.status

    // Prepare the where conditions based on filters
    const whereConditions = {}

    if (status !== undefined) {
        whereConditions.status = status
    }

    if (user) {
        whereConditions.userId = user.id
    }

    // Sorting Options
    const orderOptions = [['createdAt', 'desc']]

    // Query
    const { count, rows } = await Postpaid.findAndCountAll({
        include: [
            {
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['password', 'pin']
                }
            }
        ],
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

export const DetailPostpaidService = async (reference) => {
    const transaction = Postpaid.findOne({ where: { reference: reference } })

    if (!transaction) throw new ResponseError(404, 'Transaksi Pascabayar Tidak Ditemukan')

    return transaction
}