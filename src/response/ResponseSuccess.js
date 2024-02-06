export default function ResponseSuccess(res, message, data = null) {
    res.status(200).json({
        error: false,
        message,
        data
    })
}