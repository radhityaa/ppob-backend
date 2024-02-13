import Otp from "../models/OtpModel.js"
import User from "../models/UserModel.js"
import { ResponseError } from "../response/ResponseError.js"
import RandomOtp from "../utils/RandomOtp.js"
import jwt from 'jsonwebtoken'

export const SendOtpService = async (request) => {
    const codeOtp = RandomOtp()
    const email = request.email

    const cekUser = await User.findOne({
        where: {
            email: email
        }
    })

    if (!cekUser) throw new ResponseError(404, 'User Tidak Terdaftar')

    const username = cekUser.username

    const cekOtp = await Otp.findOne({
        where: {
            email: email
        }
    })

    if (cekOtp) {
        await cekOtp.update({
            code: codeOtp
        })

        return {
            username,
            email
        }
    }

    await Otp.create({
        username,
        email,
        code: codeOtp,
    })

    return {
        username,
        email
    }
}

export const OtpValidationService = async (request) => {
    const user = await User.findOne({
        where: {
            email: request.email
        }
    })

    if (!user) throw new ResponseError(404, 'User Tidak Ditemukan')
    if (user.isVerif) throw new ResponseError(403, 'User Sudah Diverifikasi')

    const dataOtp = await Otp.findOne({
        where: {
            username: user.username,
            email: request.email,
            code: request.code
        }
    })

    if (!dataOtp) throw new ResponseError(400, 'Otp Tidak Ditemukan / Kadaluarsa')

    await Otp.destroy({
        where: {
            username: user.username,
            email: request.email,
            id: dataOtp.id
        }
    })

    const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        saldo: user.saldo
    }

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 60 * 60 * 1
    })

    await user.update({
        isVerif: true
    })

    return {
        token
    }
}