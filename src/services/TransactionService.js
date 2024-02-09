import bcrypt from 'bcrypt'
import Digiflazz from "../models/DigiflazzModel.js"
import User from "../models/UserModel.js"
import { ResponseError } from "../response/ResponseError.js"
import { DigiflazzTopup } from "../utils/Digiflazz.js"
import Transaction from '../models/TransactionModel.js'

export const CreateTransactionService = async (user, request) => {
    const productId = request.productId
    const target = request.target
    const userId = user.id
    const pin = request.pin

    const userData = await User.findByPk(userId)
    const product = await Digiflazz.findByPk(productId)

    if (!userData) throw new ResponseError(404, 'User Tidak Ditemukan')
    if (!product) throw new ResponseError(404, 'Produk Tidak Ditemukan')
    if (userData.saldo <= product.price) throw new ResponseError(400, 'Saldo Anda Tidak Cukup')

    // Cek PIN Trx
    const cekPin = await bcrypt.compare(pin, userData.pin)
    if (!cekPin) throw new ResponseError(400, 'PIN Anda Salah')

    await userData.update({
        saldo: userData.saldo - product.price
    })

    const data = {
        reference: `digi-${Date.now()}`,
        target,
        userId,
        productId
    }

    return DigiflazzTopup(data)
}

export const GetAllTransactionService = async (request) => {
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
    const { count, rows } = await Transaction.findAndCountAll({
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

export const GetUserTransactionService = async (user, request) => {
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
    const { count, rows } = await Transaction.findAndCountAll({
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

export const DetailTransactionService = async (reference) => {
    const transaction = Transaction.findOne({ where: { reference: reference } })

    if (!transaction) throw new ResponseError(404, 'Transaksi Tidak Ditemukan')

    return transaction
}