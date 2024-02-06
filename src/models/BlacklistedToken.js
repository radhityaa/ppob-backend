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
        type: DataTypes.STRING(255)
    },
    expiry: {
        type: DataTypes.DATE
    },
}, {
    timestamps: true
})

export default BlacklistedToken