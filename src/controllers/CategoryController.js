import ResponseSuccess from "../response/ResponseSuccess.js"
import { CreateCategoryService, DeleteCategoryService, DetailCategoryService, GetCategoryService, UpdateCategoryService } from "../services/CategoryService.js"

export const GetCategoryController = async (req, res, next) => {
    try {
        const result = await GetCategoryService(req)
        return ResponseSuccess(res, 'Berhasil menampilkan data kategori', result)
    } catch (e) {
        next(e)
    }
}

export const DetailCategoryController = async (req, res, next) => {
    try {
        const result = await DetailCategoryService(req.params.slug)
        return ResponseSuccess(res, 'Berhasil Menampilkan Kategori', result)
    } catch (e) {
        next(e)
    }
}

export const CreateCategoryController = async (req, res, next) => {
    try {
        const result = await CreateCategoryService(req)
        return ResponseSuccess(res, 'Kategori Berhasil Dibuat', result)
    } catch (e) {
        next(e)
    }
}

export const UpdateCategoryController = async (req, res, next) => {
    try {
        const result = await UpdateCategoryService(req, req.params.slug)
        return ResponseSuccess(res, 'Kategori Berhasil Diubah', result)
    } catch (e) {
        next(e)
    }
}

export const DeleteCategoryController = async (req, res, next) => {
    try {
        const result = await DeleteCategoryService(req.params.slug)
        return ResponseSuccess(res, 'Kategori Berhasil Dihapus')
    } catch (e) {
        next(e)
    }
}