import { Sequelize } from "sequelize"
import BlacklistedToken from "../models/BlacklistedToken.js"
import User from "../models/UserModel.js"
import jwt from 'jsonwebtoken'
import { ResponseError } from "../response/ResponseError.js"
import bcrypt from 'bcrypt'
import Otp from "../models/OtpModel.js"
import RandomOtp from "../utils/RandomOtp.js"
import crypto from 'crypto'
import SendOtp from "../utils/SendOtp.js"
import Token from "../models/TokenModel.js"
import SendMailForgot from "../utils/SendMailForgot.js"

export const RegisterService = async (request) => {

    // Cek username
    const cekUsername = await User.findOne({
        where: {
            username: request.username,
        }
    })
    if (cekUsername) throw new ResponseError(400, 'Username Sudah Digunakan')

    // Cek Email
    const cekEmail = await User.findOne({
        where: {
            email: request.email
        }
    })
    if (cekEmail) throw new ResponseError(400, 'Email Sudah Digunakan')

    // Hashing Password And Pin
    request.password = await bcrypt.hash(request.password, 12)
    request.pin = await bcrypt.hash(request.pin, 12)

    // send OTP
    const dataOtp = await Otp.create({
        code: RandomOtp(),
        username: request.username,
        email: request.email
    })

    const newUser = await User.create({
        ...request
    })

    return {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        saldo: newUser.saldo,
        isAdmin: newUser.isAdmin,
        isVerif: newUser.isVerif,
        otp: dataOtp.code
    }
}

export const LoginService = async (request) => {
    const user = await User.findOne({
        where: {
            username: request.username
        }
    })

    if (!user) throw new ResponseError(400, 'Username / Password Salah!')

    const cekPassword = await bcrypt.compare(request.password, user.password)

    if (!cekPassword) throw new ResponseError(400, 'Username / Password Salah!')

    if (user.isVerif) {
        const payload = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            saldo: user.saldo
        }

        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 60 * 60 * 1
        })
    } else {
        throw new ResponseError(401, "Akun Belum Verifikasi")
    }
}

export const ForgotService = async (request) => {
    const user = await User.findOne({
        where: {
            email: request.email
        }
    })

    if (!user) throw new ResponseError(404, 'Email / User Tidak Terdaftar')

    if (user.isVerif) {
        let token = await Token.findOne({
            where: {
                userId: user.id
            }
        })

        if (!token) {
            token = await new Token({
                userId: user.id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save()
        }

        const link = `${process.env.BASE_URL}/password-reset/${user.id}/${token.token}`
        return {
            user,
            link
        }
    } else {
        throw new ResponseError(400, 'Akun Belum Divalidasi')
    }

}

export const ResetPasswordService = async (userId, userToken, password) => {
    const user = await User.findByPk(userId)
    if (!user) throw new ResponseError(400, 'Invalid Link Or Expired')

    const token = await Token.findOne({
        userId: user.id,
        token: userToken
    })
    if (!user) throw new ResponseError(400, 'Invalid Link Or Expired')

    user.password = await bcrypt.hash(password, 12)
    await user.save()
    await token.destroy()
}

export const BlacklistedTokenService = async (token) => {
    const expiry = jwt.decode(token).exp
    await BlacklistedToken.create({
        token,
        expiry: new Date(expiry * 1000)
    })
}

export const isTokenBlacklistedService = async (token) => {
    const found = await BlacklistedToken.findOne({
        where: {
            token: token
        }
    })

    return Boolean(found)
}

export const cleanBlacklistedTokensService = async () => {
    const now = new Date()
    await BlacklistedToken.destroy({
        where: {
            expiry: {
                [Sequelize.Op.lte]: now
            }
        }
    })
}