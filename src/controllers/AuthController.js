import ResponseSuccess from "../response/ResponseSuccess.js"
import { ForgotService, LoginService, RegisterService } from "../services/AuthService.js"
import SendOtp from "../utils/SendOtp.js"

export const RegisterController = async (req, res, next) => {
    try {
        const result = await RegisterService(req.body)
        SendOtp(result)
        return ResponseSuccess(res, 'Pendaftaran Berhasil, Silahkan Verifikasi Akun Telebih Dahulu', result)
    } catch (e) {
        next(e)
    }
}

export const LoginController = async (req, res, next) => {
    try {
        const result = await LoginService(req.body)
        return ResponseSuccess(res, 'Login Berhasil', result)
    } catch (e) {
        next(e)
    }
}

export const ForgotController = async (req, res, next) => {
    try {
        const result = await ForgotService(req.body)
        SendOtp(result)
        return ResponseSuccess(res, 'Kami telah mengirimkan kode OTP Ke Alamat Email Teresbut')
    } catch (e) {
        next(e)
    }
}