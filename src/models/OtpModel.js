import { Sequelize } from "sequelize"
import sequelize from "../app/database.js"

const { DataTypes } = Sequelize

const Otp = sequelize.define('otps', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.INTEGER,
    },
    unique: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING(100)
    },
    email: {
        type: DataTypes.STRING(100)
    }
}, {
    timestamps: true
})

export default Otp