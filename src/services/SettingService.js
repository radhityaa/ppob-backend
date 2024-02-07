import Setting from "../models/SettingModel.js"
import { ResponseError } from "../response/ResponseError.js"

export const GetAllSettingService = async () => {
    return Setting.findAll()
}

export const CreateSettingService = async (request) => {
    return Setting.create(request)
}

export const DetailSettingService = async (id, request) => {
    const data = await Setting.findByPk(id)

    if (!data) throw new ResponseError(404, 'Data Setting Tidak Ditemukan')

    return data
}

export const UpdateSettingService = async (id, request) => {
    const data = await Setting.findByPk(id)

    if (!data) throw new ResponseError(404, 'Data Setting Tidak Ditemukan')

    return data.update(request)
}

export const DeleteSettingService = async (id) => {
    const data = await Setting.findByPk(id)

    if (!data) throw new ResponseError(404, 'Data Setting Tidak Ditemukan')

    return data.destroy()
}