import { Sequelize } from "sequelize"
import sequelize from "../app/database.js"
import User from "./UserModel.js"

const { DataTypes } = Sequelize

const Activity = sequelize.define('activity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    desc: {
        type: DataTypes.TEXT
    },
    type: {
        type: DataTypes.STRING
    },
    unique: {
        type: DataTypes.STRING
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: true
})

Activity.belongsTo(User, { as: 'user' })

export default Activity