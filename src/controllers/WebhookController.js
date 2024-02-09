import ResponseSuccess from "../response/ResponseSuccess.js"
import { WebhookDigiflazzService, WehbookTripayService } from "../services/WebhookService.js"

export const WebhookTripayController = async (req, res, next) => {
    try {
        const result = await WehbookTripayService(req)
        return ResponseSuccess(res, 'Callback Successfully', result)
    } catch (e) {
        next(e)
    }
}


export const WebhookDigiflazzController = async (req, res, next) => {
    try {
        const result = await WebhookDigiflazzService(req)
        return ResponseSuccess(res, 'Callback Successfully', result)
    } catch (e) {
        next(e)
    }
}