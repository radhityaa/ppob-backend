import ResponseSuccess from "../response/ResponseSuccess.js"
import { GetCategoryService } from "../services/CategoryService.js"

export const GetCategoryController = async (req, res, next) => {
    try {
        const result = await GetCategoryService(req.params.category)
        return ResponseSuccess(res, 'Berhasil menampilkan data kategori', result)
    } catch (e) {
        next(e)
    }
}