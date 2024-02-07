import Digiflazz from "../models/DigiflazzModel.js"
import { ResponseError } from "../response/ResponseError.js"
import { Op } from 'sequelize'

export const DetailProductService = async (slug) => {
    const data = await Digiflazz.findOne({
        where: {
            slug: slug
        }
    })

    if (!data) throw new ResponseError(404, 'Data Produk Tidak Ditemukan')

    return data
}

export const GetAllProductService = async (request) => {
    // Pagination Parameters
    const page = parseInt(request.query.page, 10) || 1
    const limit = parseInt(request.query.limit, 10) || 10
    const startIndex = (page - 1) * limit

    // Sorting Parameters
    const sortByPrice = request.query.price

    // Filter Parameters
    const minPrice = parseInt(request.query.minPrice, 10)
    const maxPrice = parseInt(request.query.maxPrice, 10)

    // Prepare the where conditions based on filters
    const whereConditions = {}

    if (!isNaN(minPrice) && minPrice > 0) {
        whereConditions.price = whereConditions.price || {}
        whereConditions.price[Op.gte] = minPrice
    }

    if (!isNaN(maxPrice) && maxPrice > 0) {
        whereConditions.price = whereConditions.price || {}
        whereConditions.price[Op.lte] = maxPrice
    }

    // Sorting Options
    const orderOptions = sortByPrice === 'asc' || sortByPrice === 'desc'
        ? [['price', sortByPrice.toUpperCase()]]
        : [['createdAt', 'desc']]

    // Query
    const { count, rows } = await Digiflazz.findAndCountAll({
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