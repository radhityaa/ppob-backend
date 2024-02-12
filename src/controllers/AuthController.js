import { ResponseError } from "../response/ResponseError.js"
import ResponseSuccess from "../response/ResponseSuccess.js"
import { ForgotService, LoginService, RegisterService, ResetPasswordService } from "../services/AuthService.js"
import SendMailForgot from "../utils/SendMailForgot.js"
import SendOtp from "../utils/SendOtp.js"
import jwt from 'jsonwebtoken'

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
        SendMailForgot(result.user.email, 'Password Reset', result.link)
        return ResponseSuccess(res, 'Kami telah mengirimkan Link Ke Alamat Email Anda', result)
    } catch (e) {
        next(e)
    }
}

export const ResetPasswordController = async (req, res, next) => {
    const { userId, token } = req.params
    const { password } = req.body
    try {
        const result = await ResetPasswordService(userId, token, password)
        return ResponseSuccess(res, 'Password Berhasil Diubah', result)
    } catch (e) {
        next(e)
    }
}

export const AuthenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(403).json({
        error: true,
        message: 'Unauthorized'
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({
            error: true,
            message: err.message
        })

        return ResponseSuccess(res, 'Secure')
    })
}