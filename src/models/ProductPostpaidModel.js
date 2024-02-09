import { Sequelize } from "sequelize"
import sequelize from "../app/database.js"

const { DataTypes } = Sequelize

const ProductPostpaid = sequelize.define('product_postpaid', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: DataTypes.STRING,
    slug: DataTypes.STRING,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    seller_name: DataTypes.STRING,
    admin: DataTypes.INTEGER,
    commission: DataTypes.INTEGER,
    buyer_sku_code: DataTypes.STRING,
    buyer_product_status: DataTypes.BOOLEAN,
    seller_product_status: DataTypes.BOOLEAN,
    desc: DataTypes.TEXT
}, {
    timestamps: true
})

export default ProductPostpaid