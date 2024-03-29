import ResponseSuccess from "../response/ResponseSuccess.js"
import { ApprovalDepositService, CancelDepositService, CreateDespositService, DetailDepositService, GetAllDepositService, GetAllDepositUserService, GetStatusService, UpdateDepositeService } from "../services/DepositService.js"

export const GetAllDepositController = async (req, res, next) => {
    try {
        const result = await GetAllDepositService(req)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Deposit', result)
    } catch (e) {
        next(e)
    }
}

export const GetAllDepositUserController = async (req, res, next) => {
    try {
        const result = await GetAllDepositUserService(req, req.user)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Deposit', result)
    } catch (e) {
        next(e)
    }
}

export const CreateDepositController = async (req, res, next) => {
    try {
        const result = await CreateDespositService(req.user, req.body)
        return ResponseSuccess(res, 'Deposit Berhasil Dibuat', result)
    } catch (e) {
        next(e)
    }
}

export const DetailDepositController = async (req, res, next) => {
    try {
        const result = await DetailDepositService(req.params.reference)
        return ResponseSuccess(res, 'Berhasil Menampilkan Data Deposit', result)
    } catch (e) {
        next(e)
    }
}

export const UpdateDepositeController = async (req, res, next) => {
    try {
        const result = await UpdateDepositeService(req.params.reference, req.body)
        return ResponseSuccess(res, 'Data Deposit Berhasil Diubah', result)
    } catch (e) {
        next(e)
    }
}

export const ApprovalDepositController = async (req, res, next) => {
    try {
        const result = await ApprovalDepositService(req.params.reference)
        return ResponseSuccess(res, 'Deposit Telah Disetujui', result)
    } catch (e) {
        next(e)
    }
}

export const CancelDepositController = async (req, res, next) => {
    try {
        const result = await CancelDepositService(req.params.reference, req.user)
        return ResponseSuccess(res, 'Deposit Berhasil Dibatalkan', result)
    } catch (e) {
        next(e)
    }
}

export const GetStatusController = async (req, res, next) => {
    try {
        const result = await GetStatusService(req.params.reference, req.user)
        return ResponseSuccess(res, 'Get Status', result)
    } catch (e) {
        next(e)
    }
}