import axios from "axios"
import Setting from "../models/SettingModel.js"

export const GetChannelsService = async () => {
    const settingTripay = await Setting.findOne({ where: { name: 'tripay' } })

    const apiKey = settingTripay.d1

    const result = await axios.get('https://tripay.co.id/api-sandbox/merchant/payment-channel', {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    })

    return result.data
}