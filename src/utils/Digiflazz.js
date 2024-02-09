import axios from "axios"
import md5 from "md5"
import Activity from "../models/ActivityModel.js"
import Digiflazz from "../models/DigiflazzModel.js"
import Mutasi from "../models/MutasiModel.js"
import Postpaid from "../models/PostpaidModel.js"
import ProductPostpaid from "../models/ProductPostpaidModel.js"
import Setting from "../models/SettingModel.js"
import TopupSaldo from "../models/TopupSaldoModel.js"
import Transaction from "../models/TransactionModel.js"

export const DigiflazzTopup = async (detail) => {
    const reference = detail.reference
    const target = detail.target
    const userId = detail.userId
    const productId = detail.productId

    try {
        const settingDigiflazz = await Setting.findOne({ where: { name: 'digiflazz' } })
        const product = await Digiflazz.findByPk(productId)

        const username = settingDigiflazz.d1
        const apiKey = settingDigiflazz.d2

        // Production Mode

        // const request = {
        //     username,
        //     buyer_sku_code: product.buyer_sku_code,
        //     customer_no: target,
        //     ref_id: reference,
        //     sign: md5(username + apiKey + reference)
        // }

        // Development Mode

        const request = {
            username,
            buyer_sku_code: 'xld10',
            customer_no: '087800001233', // Webhook Sukses
            // customer_no: '087800001234', // Webhook Gagal
            ref_id: reference,
            testing: true,
            sign: md5(username + apiKey + reference)
        }

        const { data } = await axios.post('https://api.digiflazz.com/v1/transaction', request)

        const transaction = await Transaction.create({
            reference: reference,
            target: data.data.customer_no,
            desc: data.data.message,
            status: data.data.status,
            userId,
            productId
        })

        await Activity.create({
            title: `Transaksi - ${transaction.reference}`,
            desc: `Terima kasih sudah melakukan Transaksi Dengan No. Reference ${reference}, Seharga: ${product.price}, Status: ${transaction.status}`,
            type: 'transaction',
            unique: transaction.reference,
            userId
        })

        await Mutasi.create({
            title: `Transaksi ${product.category} ${product.brand} - ${product.product_name} / ${transaction.reference}`,
            type: 'debit',
            balance_remaining: product.price,
            userId
        })

        return data.data
    } catch (e) {
        console.error("DigiflazzTopup error:", e.response.data)
        return e.response.data
    }
}

export const DigiflazzPostpaid = async (detail) => {
    const reference = detail.reference
    const target = detail.target
    const userId = detail.userId
    const productId = detail.productId

    try {
        const settingDigiflazz = await Setting.findOne({ where: { name: 'digiflazz' } })
        const product = await ProductPostpaid.findByPk(productId)

        const username = settingDigiflazz.d1
        const apiKey = settingDigiflazz.d2

        // Production Mode

        // request = {
        //     commands: "pay-pasca",
        //     username,
        //     buyer_sku_code: product.buyer_sku_code,
        //     customer_no: target,
        //     ref_id: reference,
        //     sign: md5(username + apiKey + reference)
        // }

        // Development Mode
        const request = {
            commands: "pay-pasca",
            username,
            buyer_sku_code: 'pln',
            customer_no: '530000000002',
            ref_id: reference,
            testing: true,
            sign: md5(username + apiKey + reference)
        }

        const { data } = await axios.post('https://api.digiflazz.com/v1/transaction', request)

        const postpaid = await Postpaid.create({
            reference: reference,
            target: data.data.customer_no,
            customer_name: data.data.customer_name,
            admin: data.data.admin,
            message: data.data.message,
            status: data.data.status,
            sn: data.data.sn,
            selling_price: data.data.selling_price,
            desc: JSON.stringify(data.data.desc),
            userId,
            productId
        })

        await Activity.create({
            title: `Transaksi - ${postpaid.reference}`,
            desc: `Terima kasih sudah melakukan Transaksi Dengan No. Reference ${reference}, Seharga: ${postpaid.price}, Status: ${postpaid.status}`,
            type: 'transaction',
            unique: postpaid.reference,
            userId
        })

        await Mutasi.create({
            title: `Transaksi ${product.category} ${product.brand} - ${product.product_name} / ${postpaid.reference}`,
            type: 'debit',
            balance_remaining: postpaid.selling_price,
            userId
        })

        return data.data
    } catch (e) {
        console.error("DigiflazzPostpaid error:", e.response.data)
        return e.response.data
    }
}

export const DigiflazzInqPasca = async (detail) => {
    const reference = detail.reference
    const target = detail.target
    const productId = detail.productId

    try {
        const settingDigiflazz = await Setting.findOne({ where: { name: 'digiflazz' } })
        const product = await ProductPostpaid.findByPk(productId)

        const username = settingDigiflazz.d1
        const apiKey = settingDigiflazz.d2

        // Production Mode

        // request = {
        //     commands: "pay-pasca",
        //     username,
        //     buyer_sku_code: product.buyer_sku_code,
        //     customer_no: target,
        //     ref_id: reference,
        //     sign: md5(username + apiKey + reference)
        // }

        // Development Mode
        const request = {
            commands: "inq-pasca",
            username,
            buyer_sku_code: 'pln',
            customer_no: '530000000001',
            ref_id: reference,
            testing: true,
            sign: md5(username + apiKey + reference)
        }

        const { data } = await axios.post('https://api.digiflazz.com/v1/transaction', request)

        return data.data
    } catch (e) {
        console.error("DigiflazzPostpaid error:", e.response.data)
        return e.response.data
    }
}

export const DigiflazzInqToken = async (detail) => {
    const target = detail.target

    try {
        const request = {
            commands: "pln-subscribe",
            customer_no: target,
        }

        const { data } = await axios.post('https://api.digiflazz.com/v1/transaction', request)

        return data.data
    } catch (e) {
        console.error("DigiflazzInqPLN error:", e.response.data)
        return e.response.data
    }
}

export const DigiflazzTopupSaldo = async (detail) => {
    const amount = detail.amount
    const bank = detail.bank
    const owner_name = detail.owner_name
    const userId = detail.userId

    try {
        const settingDigiflazz = await Setting.findOne({ where: { name: 'digiflazz' } })

        const username = settingDigiflazz.d1
        const apiKey = settingDigiflazz.d2

        const request = {
            username,
            amount,
            bank: bank,
            owner_name,
            sign: md5(username + apiKey + "deposit")
        }

        const { data } = await axios.post('https://api.digiflazz.com/v1/deposit', request)

        const deposit = await TopupSaldo.create({
            amount,
            bank,
            owner_name,
            amount_transfer: data.data.amount,
            notes: data.data.notes,
            rc: data.data.rc,
            userId
        })

        await Activity.create({
            title: `Deposit Digiflazz - ${amount}`,
            desc: `Terima kasih sudah melakukan Deposit Digiflazz, Jumlah Deposit: ${amount}, Status: ${deposit.rc}`,
            type: 'deposit',
            userId
        })

        return data.data
    } catch (e) {
        console.error("DigiflazzDeposit error:", e.response.data)
        return e.response.data
    }
}