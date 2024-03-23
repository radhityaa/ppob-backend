import path from 'path'
import fs from 'fs'
import { ResponseError } from '../response/ResponseError.js'

const uploadImage = async (image, src) => {
    const allowedType = ['.png', '.jpg', '.jpeg', '.webp']

    try {
        const fileSize = image.size
        const ext = path.extname(image.name).toLowerCase()
        const fileName = Math.random().toString(32).substring(2, 2 + 32) + ext

        if (!allowedType.includes(ext)) throw new ResponseError(400, 'Format Gambar Tidak Didukung')
        if (fileSize > 5000000) throw new ResponseError(400, 'Gambar Maximal 5MB')

        await new Promise((resolve, reject) => {
            image.mv(`./images/${src}/${fileName}`, (err) => {
                if (err) {
                    reject(new ResponseError(500, err.message))
                } else {
                    resolve()
                }
            })
        })

        return fileName
    } catch (e) {
        throw new ResponseError(500, e)
    }
}

const deleteImage = async (imagePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(imagePath, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

export {
    uploadImage,
    deleteImage
}