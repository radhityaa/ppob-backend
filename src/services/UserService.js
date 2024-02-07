import User from "../models/UserModel.js"

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