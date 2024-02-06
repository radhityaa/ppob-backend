import Otp from "../models/OtpModel.js"
import User from "../models/UserModel.js"
import { ResponseError } from "../response/ResponseError.js"
import RandomOtp from "../utils/RandomOtp.js"
import jwt from 'jsonwebtoken'

export const SendOtpService = async (request) => {
    const codeOtp = RandomOtp()
    const username = request.username
    const email = request.email

    const cekUser = await User.findOne({
        where: {
            username: username,
            email: email
        }
    })

    if (!cekUser) throw new ResponseError(404, 'User Tidak Terdaftar')

    const cekOtp = await Otp.findOne({
        where: {
            username: username
        }
    })

    if (cekOtp) {
        await cekOtp.update({
            code: codeOtp
        })

        return {
            name: cekUser.name,
            email: cekUser.email,
            username: cekUser.username,
            phone: cekUser.phone,
            type: cekUser.type,
            createdAt: cekUser.createdAt,
            code: codeOtp,
        }
    }

    const dataOtp = await Otp.create({
        username: username,
        code: codeOtp,
    })

    return {
        name: cekUser.name,
        email: cekUser.email,
        username: cekUser.username,
        phone: cekUser.phone,
        type: cekUser.type,
        createdAt: cekUser.createdAt,
        code: dataOtp.code,
    }
}

export const OtpValidationService = async (request) => {
    const user = await User.findOne({
        where: {
            username: request.username
        }
    })

    if (!user) throw new ResponseError(404, 'User Tidak Ditemukan')

    const dataOtp = await Otp.findOne({
        where: {
            username: request.username,
            email: request.email,
            code: request.code
        }
    })

    if (!dataOtp) throw new ResponseError(400, 'Otp Tidak Ditemukan / Kadaluarsa')

    await Otp.destroy({
        where: {
            username: request.username,
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