import ResponseSuccess from "../response/ResponseSuccess.js"
import { OtpValidationService } from "../services/OtpService.js"

export const OtpValidationController = async (req, res, next) => {
    try {
        const result = await OtpValidationService(req.body)
        return ResponseSuccess(res, 'Valid', result)
    } catch (e) {
        next(e)
    }
}