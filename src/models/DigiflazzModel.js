import { Sequelize } from "sequelize"
import sequelize from "../app/database.js"

const { DataTypes } = Sequelize

const Digiflazz = sequelize.define('products_digiflazz', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: DataTypes.STRING,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    seller_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    buyer_sku_code: DataTypes.STRING,
    buyer_product_status: DataTypes.BOOLEAN,
    seller_product_status: DataTypes.BOOLEAN,
    unlimited_stock: DataTypes.BOOLEAN,
    stock: DataTypes.INTEGER,
    multi: DataTypes.BOOLEAN,
    start_cut_off: DataTypes.STRING,
    end_cut_off: DataTypes.STRING,
    desc: DataTypes.STRING
}, {
    timestamps: true
})

export default Digiflazz