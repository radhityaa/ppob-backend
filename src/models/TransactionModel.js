import { Sequelize } from "sequelize"
import sequelize from "../app/database.js"
import User from "./UserModel.js"
import Digiflazz from "./DigiflazzModel.js"

const { DataTypes } = Sequelize

const Transaction = sequelize.define('transaction', {
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
    desc: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.STRING
    },
    sn: {
        type: DataTypes.STRING
    },
}, {
    timestamps: true
})

Transaction.belongsTo(User, { as: 'user' })
Transaction.belongsTo(Digiflazz, { as: 'product' })

export default Transaction