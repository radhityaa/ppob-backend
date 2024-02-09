import { Sequelize } from 'sequelize'
import sequelize from '../app/database.js'
import User from './UserModel.js'

const { DataTypes } = Sequelize

const TopupSaldo = sequelize.define('topup_saldo_digiflazz', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: DataTypes.INTEGER,
    bank: DataTypes.STRING,
    owner_name: DataTypes.STRING,
    amount_transfer: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    rc: DataTypes.STRING,
}, {
    timestamps: true
})

TopupSaldo.belongsTo(User, { as: 'user' })

export default TopupSaldo