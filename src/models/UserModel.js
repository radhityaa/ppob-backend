import { Sequelize } from 'sequelize'
import sequelize from '../app/database.js'

const { DataTypes } = Sequelize

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    pin: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20)
    },
    saldo: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
        allowNull: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
    isVerif: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    }
}, {
    timestamps: true
})

export default User