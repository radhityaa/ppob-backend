import { Sequelize } from "sequelize"
import sequelize from "../app/database.js"

const { DataTypes } = Sequelize

const Setting = sequelize.define('setting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    d1: DataTypes.STRING,
    d2: DataTypes.STRING,
    d3: DataTypes.STRING,
    d4: DataTypes.STRING,
    d5: DataTypes.STRING,
    d6: DataTypes.STRING,
    d7: DataTypes.STRING,
    d8: DataTypes.STRING,
    d9: DataTypes.STRING,
    d10: DataTypes.STRING,
}, {
    timestamps: true
})

export default Setting