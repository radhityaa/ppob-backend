import ResponseSuccess from "../response/ResponseSuccess.js"
import { OtpValidationService, SendOtpService } from "../services/OtpService.js"
import SendOtp from "../utils/SendOtp.js"

export const SendOtpController = async (req, res, next) => {
    try {
        const result = await SendOtpService(req.body)
        SendOtp(result)
        return ResponseSuccess(res, 'OTP Berhasil Dikirim', result)
    } catch (e) {
        next(e)
    }
}

export const OtpValidationController = async (req, res, next) => {
    try {
        const result = await OtpValidationService(req.body)
        return ResponseSuccess(res, 'Verifikasi Berhasil', result)
    } catch (e) {
        next(e)
    }
}