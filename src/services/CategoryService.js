import path from "path"
import { Op, Sequelize } from "sequelize"
import { fileURLToPath } from 'url'
import { deleteImage, uploadImage } from "../helpers/ImageHelper.js"
import Slug from "../helpers/SlugHelper.js"
import Category from "../models/CategoryModel.js"
import { ResponseError } from "../response/ResponseError.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const imageUrl = `${process.env.BASE_URL}/images/categories/`

export const GetCategoryService = async (request) => {
    const page = parseInt(request.query.page, 10) || 1
    const limit = parseInt(request.query.limit, 10) || 10
    const startIndex = (page - 1) * limit

    const search = request.query.s

    let whereConditions = {}

    if (search) {
        whereConditions[Op.or] = [
            Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', `%${search.toLowerCase()}%`)
        ]
    } else {
        whereConditions[Op.or] = [
            { name: { [Op.ne]: null } }, // Any non-null Name
        ]
    }

    const { count, rows } = await Category.findAndCountAll({
        attributes: {
            include: [
                [Sequelize.literal(`CONCAT('${imageUrl}', image)`), 'image']
            ]
        },
        where: whereConditions,
        limit: limit,
        offset: startIndex,
        order: [['createdAt', 'desc']]
    })

    const results = {}

    if (startIndex + limit < count) {
        results.next = {
            page: page + 1,
            limit: limit,
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit,
        }
    }

    results.totalRow = count
    results.data = rows

    return { ...results }
}

export const CreateCategoryService = async (request) => {
    const name = request.body.name
    const image = request.files.image

    const fileName = (await uploadImage(image, 'categories')).toString()

    return Category.create({
        name,
        image: fileName,
        slug: Slug(name, 5)
    })
}

export const DetailCategoryService = async (request) => {
    // const category = await Category.findOne({
    //     where: { slug: request },
    //     attributes: {
    //         include: [
    //             [Sequelize.literal(`CONCAT('${imageUrl}', image)`), 'image']
    //         ]
    //     }
    // })

    // if (!category) throw new ResponseError(404, 'Kategori Tidak Ditemukan')

    // return category
    return Category.findAll({ where: { name: request } })
}

export const UpdateCategoryService = async (request, slug) => {
    const name = request.body.name

    const category = await Category.findOne({ where: { slug: slug } })

    if (!category) throw new ResponseError(404, 'Kategori Tidak Ditemukan')

    if (request.files && request.files['image']) {
        const imagePath = (path.join(__dirname, '../../', 'images/categories', category.image))
        await deleteImage(imagePath)

        const fileName = (await uploadImage(request.files['image'], 'categories')).toString()

        return category.update({
            name,
            image: fileName
        })
    }

    return category.update({
        name
    })

}

export const DeleteCategoryService = async (slug) => {
    const category = await Category.findOne({ where: { slug: slug } })

    if (!category) throw new ResponseError(404, 'Kategori Tidak Ditemukan')

    const imagePath = (path.join(__dirname, '../../', 'images/categories', category.image))
    await deleteImage(imagePath)
    return category.destroy()
}