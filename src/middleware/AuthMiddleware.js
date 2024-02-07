import jwt from 'jsonwebtoken'
import { isTokenBlacklistedService } from '../services/AuthService.js'

export const AuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({
        error: true,
        message: 'Unauthorized'
    })

    const isBlacklisted = await isTokenBlacklistedService(token)
    if (isBlacklisted) return res.status(401).json({
        error: true,
        message: 'Unauthorized'
    })

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decode
        next()
    } catch (e) {
        return res.status(403).json({
            error: true,
            message: 'Forbidden'
        })
    }
}