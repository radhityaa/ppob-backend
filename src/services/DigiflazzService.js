import axios from "axios"
import md5 from 'md5'
import { Sequelize } from "sequelize"
import slugify from "slugify"
import Digiflazz from "../models/DigiflazzModel.js"
import Setting from "../models/SettingModel.js"
import { ResponseError } from "../response/ResponseError.js"
import Postpaid from "../models/PostpaidModel.js"
import ProductPostpaid from "../models/ProductPostpaidModel.js"

export const GetDigiflazzService = async () => {
    const settingDigiflazz = await Setting.findOne({
        where: {
            name: 'digiflazz'
        }
    })

    if (!settingDigiflazz) throw new ResponseError(400, 'Pengaturan Digiflazz Belum Disetting')

    // Account API Digiflazz
    const username = settingDigiflazz.d1
    const apiKey = settingDigiflazz.d2
    const type = 'pricelist'

    // Request Data API Digiflazz
    const request = {
        cmd: 'prepaid',
        username: username,
        sign: md5(username + apiKey + type)
    }

    try {
        const response = await axios.post('https://api.digiflazz.com/v1/price-list', request)
        const data = response.data.data

        const digiflazzSkus = data.map(item => item.buyer_sku_code)

        // Looping dan simpan data product ke database
        for (const item of data) {
            // Mencari product berdasarkan buyer_sku_code
            const product = await Digiflazz.findOne({ where: { buyer_sku_code: item.buyer_sku_code } })
            const slug = slugify(item.product_name, {
                lower: true
            })

            if (product) {
                // Jika produk ditemukan, selalu update dengan data baru
                await product.update({
                    product_name: item.product_name,
                    slug: slug,
                    category: item.category,
                    brand: item.brand,
                    type: item.type,
                    seller_name: item.seller_name,
                    price: item.price,
                    buyer_product_status: item.buyer_product_status,
                    seller_product_status: item.seller_product_status,
                    unlimited_stock: item.unlimited_stock,
                    stock: item.stock,
                    multi: item.multi,
                    start_cut_off: item.start_cut_off,
                    end_cut_off: item.end_cut_off,
                    desc: item.desc
                })
            } else {
                // Jika produk tidak ditemukan, buat entri baru
                await Digiflazz.create({
                    product_name: item.product_name,
                    slug: slug,
                    category: item.category,
                    brand: item.brand,
                    type: item.type,
                    seller_name: item.seller_name,
                    price: item.price,
                    buyer_sku_code: item.buyer_sku_code,
                    buyer_product_status: item.buyer_product_status,
                    seller_product_status: item.seller_product_status,
                    unlimited_stock: item.unlimited_stock,
                    stock: item.stock,
                    multi: item.multi,
                    start_cut_off: item.start_cut_off,
                    end_cut_off: item.end_cut_off,
                    desc: item.desc
                });
            }
        }

        // Hapus produk yang tidak ada di digiflazz
        await Digiflazz.destroy({
            where: {
                buyer_sku_code: { [Sequelize.Op.notIn]: digiflazzSkus }
            }
        })

    } catch (e) {
        throw new ResponseError(500, e.message)
    }
}

export const GetPostpaidService = async () => {
    const settingDigiflazz = await Setting.findOne({
        where: {
            name: 'digiflazz'
        }
    })

    if (!settingDigiflazz) throw new ResponseError(400, 'Pengaturan Digiflazz Belum Disetting')

    // Account API Digiflazz
    const username = settingDigiflazz.d1
    const apiKey = settingDigiflazz.d2
    const type = 'pricelist'

    // Request Data API Digiflazz
    const request = {
        cmd: 'pasca',
        username: username,
        sign: md5(username + apiKey + type)
    }

    try {
        const response = await axios.post('https://api.digiflazz.com/v1/price-list', request)
        const data = response.data.data

        const digiflazzSkus = data.map(item => item.buyer_sku_code)

        // Looping dan simpan data product ke database
        for (const item of data) {
            // Mencari product berdasarkan buyer_sku_code
            const product = await ProductPostpaid.findOne({ where: { buyer_sku_code: item.buyer_sku_code } })
            const slug = slugify(item.product_name, {
                lower: true
            })

            if (product) {
                // Jika produk ditemukan, selalu update dengan data baru
                await product.update({
                    product_name: item.product_name,
                    slug: slug,
                    category: item.category,
                    brand: item.brand,
                    seller_name: item.seller_name,
                    admin: item.admin,
                    commission: item.commission,
                    buyer_sku_code: item.buyer_sku_code,
                    buyer_product_status: item.buyer_product_status,
                    seller_product_status: item.seller_product_status,
                    desc: item.desc
                })
            } else {
                // Jika produk tidak ditemukan, buat entri baru
                await ProductPostpaid.create({
                    product_name: item.product_name,
                    slug: slug,
                    category: item.category,
                    brand: item.brand,
                    seller_name: item.seller_name,
                    admin: item.admin,
                    commission: item.commission,
                    buyer_sku_code: item.buyer_sku_code,
                    buyer_product_status: item.buyer_product_status,
                    seller_product_status: item.seller_product_status,
                    desc: item.desc
                });
            }
        }

        // Hapus produk yang tidak ada di digiflazz
        await ProductPostpaid.destroy({
            where: {
                buyer_sku_code: { [Sequelize.Op.notIn]: digiflazzSkus }
            }
        })

    } catch (e) {
        throw new ResponseError(500, e.message)
    }
}

export const CekSaldoService = async () => {
    const settingDigiflazz = await Setting.findOne({
        where: {
            name: 'digiflazz'
        }
    })

    if (!settingDigiflazz) throw new ResponseError(400, 'Pengaturan Digiflazz Belum Disetting')

    // Account API Digiflazz
    const username = settingDigiflazz.d1
    const apiKey = settingDigiflazz.d2
    const type = 'depo'

    // Request Data API Digiflazz
    const request = {
        cmd: 'deposit',
        username: username,
        sign: md5(username + apiKey + type)
    }

    try {
        const { data } = await axios.post('https://api.digiflazz.com/v1/cek-saldo', request)
        return data.data

    } catch (e) {
        throw new ResponseError(500, e.message)
    }
}