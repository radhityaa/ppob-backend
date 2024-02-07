import { Sequelize } from "sequelize"
import sequelize from "../app/database.js"
import User from "./UserModel.js"

const { DataTypes } = Sequelize

const Mutasi = sequelize.define('mutasi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.TEXT
    },
    balance_remaining: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: true
})

Mutasi.belongsTo(User, { as: 'user' })

export default Mutasi