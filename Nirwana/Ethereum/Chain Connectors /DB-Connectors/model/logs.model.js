"use strict";
const dbInfo = require("./config");
const Sequelize = require("sequelize");

module.exports = sequelize => {
  return sequelize.define(
    dbInfo.TABLE_LOGS,
    {
      log_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      blockHash: {
        type: Sequelize.TEXT
      },
      blockNumber: {
        type: Sequelize.BIGINT
      },
      address: {
        type: Sequelize.TEXT
      },
      data: {
        type: Sequelize.TEXT
      },
      id: {
        type: Sequelize.TEXT
      },
      logIndex: {
        type: Sequelize.TEXT
      },
      removed: {
        type: Sequelize.TEXT
      },
      topics: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      transactionHash: {
        type: Sequelize.TEXT
      },
      transactionInlogsdex: {
        type: Sequelize.TEXT
      },
      transactionLogIndex: {
        type: BIGINT
      },
      type: {
        type: Sequelize.TEXT
      }
    },
    {
      schema: dbInfo.DB_SCHEMA,
      tableName: dbInfo.TABLE_LOGS,
      timestamps: false
    }
  );
};
