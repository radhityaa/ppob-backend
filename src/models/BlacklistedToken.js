import { Sequelize } from "sequelize"
import sequelize from "../app/database.js"

const { DataTypes } = Sequelize

const BlacklistedToken = sequelize.define('blacklisted_tokens', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.TEXT
    },
    expiry: {
        type: DataTypes.DATE
    },
}, {
    timestamps: true
})

export default BlacklistedToken