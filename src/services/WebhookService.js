import Setting from "../models/SettingModel.js"
import crypto from "crypto"
import { ResponseError } from "../response/ResponseError.js"
import Deposit from "../models/DepositModel.js"
import User from "../models/UserModel.js"
import Activity from "../models/ActivityModel.js"
import FormatCurrency from "../utils/FormatCurrency.js"
import Mutasi from "../models/MutasiModel.js"
import Transaction from "../models/TransactionModel.js"

export const WehbookTripayService = async (req) => {
    const settingTripay = await Setting.findOne({ where: { name: 'tripay' } })

    const privateKey = settingTripay.d2
    const callbackSignature = req.headers['x-callback-signature']
    const json = JSON.stringify(req.body)
    const signature = crypto.createHmac('sha256', privateKey).update(json).digest('hex')

    if (signature !== callbackSignature) {
        throw new ResponseError(400, 'Invalid Signature')
    }

    if (req.headers['x-callback-event'] !== 'payment_status') {
        throw new ResponseError(400, 'Unrecognized callback event, no action was taken')
    }

    const data = req.body
    const invoiceId = data.merchant_ref
    const tripayReference = data.reference
    const amount_received = data.amount_received
    const status = data.status.toUpperCase()

    if (data.is_closed_payment === 1) {
        try {
            const invoice = await Deposit.findOne({
                where: {
                    merchant_ref: invoiceId,
                    reference: tripayReference,
                    status: 'UNPAID'
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: {
                            exclude: ['password', 'pin']
                        }
                    }
                ]
            })

            if (!invoice) {
                throw new ResponseError(400, `No invoice found or already paid: ${invoiceId}`)
            }

            switch (status) {
                case 'PAID':
                    await invoice.update({ status: 'PAID' })
                    const user = await User.findOne({ where: { id: invoice.user.id } })

                    await Activity.create({
                        title: `Deposit - ${invoice.reference}`,
                        desc: `Pembayaran Berhasil Untuk Deposit Dengan Nomor Reference: ${invoice.reference}, Sejumlah: ${FormatCurrency(invoice.amount)}, Saldo Diterima: ${FormatCurrency(invoice.amount_received)}, Pembayaran Melalui: ${invoice.payment_name}`,
                        type: 'deposit',
                        unique: invoice.reference,
                        userId: user.id
                    })

                    await Mutasi.create({
                        title: `Deposit Melalui ${invoice.payment_name}`,
                        type: 'kredit',
                        balance_remaining: invoice.amount_received,
                        userId: user.id
                    })

                    await user.update({ saldo: user.saldo + amount_received })
                    break;

                case 'EXPIRED':
                    await invoice.update({ status: 'EXPIRED' })
                    break;

                case 'FAILED':
                    await invoice.update({ status: 'FAILED' })
                    break;

                default:
                    throw new ResponseError(400, 'Unrecognized payment status')
                    break;
            }

        } catch (e) {
            throw new ResponseError(500, 'Error processing request')
        }
    }
}

export const WebhookDigiflazzService = async (req) => {
    const post_data = JSON.stringify(req.body)
    const settingDigiflazz = await Setting.findOne({ where: { name: 'digiflazz' } })

    const secret = settingDigiflazz.d3
    const signature = 'sha1=' + crypto.createHmac('sha1', secret).update(post_data).digest('hex')

    if (req.get('X-Hub-Signature') === signature) {
        const eventData = req.body.data
        console.log('Webhook Event Data: ', eventData)

        if (eventData.status === 'Sukses') {
            return Transaction.update({
                desc: eventData.message,
                status: eventData.status,
                sn: eventData.sn
            }, {
                where: { reference: eventData.ref_id }
            })
        } else {
            const transaction = await Transaction.findOne({ where: { reference: eventData.ref_id } })
            const user = await User.findByPk(transaction.userId)

            await Mutasi.create({
                title: `Pengembalian Saldo Karna ${eventData.message} - Status: ${eventData.status} / Sejumlah: ${eventData.price}`,
                type: 'kredit',
                balance_remaining: eventData.price,
                userId: transaction.userId
            })

            await user.update({
                saldo: user.saldo + eventData.price
            })

            return Transaction.update({
                desc: eventData.message,
                status: eventData.status,
                sn: eventData.sn
            }, {
                where: { reference: eventData.ref_id }
            })
        }

    } else {
        throw new ResponseError(500, 'Invalid signature. Webhook ignored')
    }
}