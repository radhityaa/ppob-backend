import { Sequelize } from "sequelize"
import sequelize from "../app/database.js"
import User from "./UserModel.js"

const { DataTypes } = Sequelize

const Deposit = sequelize.define('deposit', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reference: {
        type: DataTypes.STRING
    },
    merchant_ref: {
        type: DataTypes.STRING
    },
    payment_method: {
        type: DataTypes.STRING
    },
    payment_name: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.DOUBLE
    },
    total_fee: {
        type: DataTypes.DOUBLE
    },
    amount_received: {
        type: DataTypes.DOUBLE
    },
    pay_code: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING(10)
    },
    type: {
        type: DataTypes.STRING(20)
    },
}, {
    timestamps: true
})

Deposit.belongsTo(User, { as: 'user' })

export default Deposit