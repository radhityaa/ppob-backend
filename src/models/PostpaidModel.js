import { Sequelize } from "sequelize"
import sequelize from "../app/database.js"
import ProductPostpaid from "./ProductPostpaidModel.js"
import User from "./UserModel.js"

const { DataTypes } = Sequelize

const Postpaid = sequelize.define('postpaid', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reference: {
        type: DataTypes.STRING
    },
    target: {
        type: DataTypes.STRING
    },
    customer_name: {
        type: DataTypes.STRING
    },
    admin: {
        type: DataTypes.STRING
    },
    message: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.STRING
    },
    sn: {
        type: DataTypes.STRING
    },
    selling_price: {
        type: DataTypes.STRING
    },
    desc: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: true
})

Postpaid.belongsTo(User, { as: 'user' })
Postpaid.belongsTo(ProductPostpaid, { as: 'product' })

export default Postpaid