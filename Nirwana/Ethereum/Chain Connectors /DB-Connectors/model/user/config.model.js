
'use strict'
const dbInfo = require('../config')
const Sequelize = require('sequelize')

module.exports = (sequelize) => {

    return sequelize.define(dbInfo.TABLE_CONFIG, {
        otp_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: Sequelize.STRING,
        },
        value: {
            type: Sequelize.STRING,
        }
    }, {
            schema: dbInfo.DB_SCHEMA,
            tableName: dbInfo.TABLE_CONFIG,
            timestamps: false,
        })
}