import Mutasi from "../models/MutasiModel.js"
import { ResponseError } from "../response/ResponseError.js"

export const GetAllMutasiService = async (user) => {
    const mutasi = Mutasi.findAll({
        where: {
            userId: user.id
        }
    })

    return mutasi
}