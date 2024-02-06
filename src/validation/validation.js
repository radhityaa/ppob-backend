import { validationResult } from 'express-validator'

const validation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            message: errors.array()
        })
    }

    next()
}

export default validation