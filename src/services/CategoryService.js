import Category from "../models/CategoryModel.js"

export const GetCategoryService = async (request) => {
    return Category.findAll({ where: { name: request } })
}