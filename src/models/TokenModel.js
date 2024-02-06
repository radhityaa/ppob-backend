import { Sequelize } from 'sequelize'
import sequelize from '../app/database.js'

const { DataTypes } = Sequelize

const Token = sequelize.define('tokens', {
    userId: {
        type: DataTypes.INTEGER
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    timestamps: true
})

export default Token