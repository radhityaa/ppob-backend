import ResponseSuccess from "../response/ResponseSuccess.js"
import { DetailProductService, GetAllProductService } from "../services/ProductService.js"

export const DetailProductController = async (req, res, next) => {
    const { slug } = req.params

    try {
        const result = await DetailProductService(slug)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Produk', result)
    } catch (e) {
        next(e)
    }
}

export const GetAllProductController = async (req, res, next) => {
    try {
        const result = await GetAllProductService(req)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Produk', result)
    } catch (e) {
        next(e)
    }
}