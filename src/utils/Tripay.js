import axios from "axios"
import Setting from "../models/SettingModel.js"
import crypto from "crypto"
import Deposit from "../models/DepositModel.js"
import Activity from "../models/ActivityModel.js"
import FormatCurrency from "./FormatCurrency.js"
import { ResponseError } from "../response/ResponseError.js"

const CreateInvoiceDeposit = async (user, request) => {
    // Cek Data Tripay
    const settingTripay = await Setting.findOne({ where: { name: 'tripay' } })

    const orderItems = [
        {
            'sku': `DPS-${Date.now()}`,
            'name': `Deposit ${request.nominal}`,
            'price': request.nominal,
            'quantity': 1,
            'target': user.phone
        }
    ]

    const price = request.nominal
    const apiKey = settingTripay.d1
    const privateKey = settingTripay.d2
    const merchant_code = settingTripay.d3
    const merchant_ref = `DPS-${Date.now()}`

    const signature = crypto.createHmac('sha256', privateKey).update(merchant_code + merchant_ref + price).digest('hex')
    const payload = {
        'method': request.method,
        'merchant_ref': merchant_ref,
        'amount': price,
        'customer_name': user.name,
        'customer_email': user.email,
        'customer_phone': user.phone,
        'order_items': orderItems,
        'signature': signature
    }

    const { data } = await axios.post('https://tripay.co.id/api-sandbox/transaction/create', payload, {
        headers: { Authorization: `Bearer ${apiKey}` }
    })
        .catch(err => console.log(err))

    await Deposit.create({
        reference: data.data.reference,
        merchant_ref: merchant_ref,
        payment_method: data.data.payment_method,
        payment_name: data.data.payment_name,
        amount: data.data.amount,
        total_fee: data.data.fee_customer,
        pay_code: data.data.pay_code,
        amount_received: data.data.amount_received,
        status: data.data.status,
        type: 'otomatis',
        userId: user.id
    })

    await Activity.create({
        title: `Deposit - ${data.data.reference}`,
        desc: `Menunggu Pembayaran Untuk Deposit Dengan Nomor Reference: ${data.data.reference}, Sejumlah: ${FormatCurrency(request.nominal)}, Saldo Diterima: ${FormatCurrency(data.data.amount_received)}, Pembayaran Melalui: ${data.data.payment_name}`,
        type: 'deposit',
        unique: data.data.reference,
        userId: user.id
    })

    return data.data
}

const DetailPayment = async (reference) => {
    const settingTripay = await Setting.findOne({ where: { name: 'tripay' } })

    const apiKey = settingTripay.d1


    try {
        const result = await axios.get('https://tripay.co.id/api-sandbox/transaction/detail?reference=' + reference, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        })

        return result.data
    } catch (e) {
        throw new ResponseError(500, e)
    }
}

export {
    CreateInvoiceDeposit,
    DetailPayment
}