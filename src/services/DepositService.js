import Deposit from "../models/DepositModel.js"
import User from "../models/UserModel.js"
import { ResponseError } from "../response/ResponseError.js"
import { CreateInvoiceDeposit } from "../utils/Tripay.js"

export const CreateDespositService = async (user, request) => {

    // Cek Status Desposit
    const deposit = await Deposit.findOne({
        where: {
            userId: user.id,
            status: 'UNPAID'
        }
    })

    if (deposit) throw new ResponseError(400, 'Terdapat Deposit Yang Belum Diselesaikan')

    if (request.type === 'otomatis') {
        try {
            return CreateInvoiceDeposit(user, request)
        } catch (e) {
            throw new ResponseError(500, e)
        }
    }

    return Deposit.create({
        reference: `DPS-MNL-${Date.now()}`,
        merchant_ref: `DPS-MNL-${Date.now()}`,
        payment_method: 'Manual',
        payment_name: 'Manual',
        amount: request.nominal,
        total_fee: 0,
        pay_code: 0,
        amount_received: request.nominal,
        status: 'UNPAID',
        type: 'manual',
        userId: user.id
    })


}

export const DetailDepositService = async (reference) => {
    const deposit = await Deposit.findOne({
        where: {
            reference: reference
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

    if (!deposit) throw new ResponseError(404, 'Data Deposit Tidak Ditemukan')

    return deposit
}

export const UpdateDepositeService = async (reference, request) => {
    const deposit = await Deposit.findOne({
        where: {
            reference: reference
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

    if (!deposit) throw new ResponseError(404, 'Data Deposit Tidak Ditemukan')

    return deposit.update(request)
}

export const ApprovalDepositService = async (reference) => {
    const deposit = await Deposit.findOne({
        where: {
            reference: reference
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

    if (!deposit) throw new ResponseError(404, 'Data Deposit Tidak Ditemukan')

    if (deposit.status === 'PAID' || deposit.status === 'SENT') {
        throw new ResponseError(400, 'Tidak Dapat Disetujui Dua Kali')
    } else {
        const user = await User.findOne({
            where: {
                id: deposit.user.id
            }
        })

        await user.update({
            saldo: user.saldo + deposit.amount_received
        })

        await deposit.update({
            status: 'SENT'
        })
    }


}