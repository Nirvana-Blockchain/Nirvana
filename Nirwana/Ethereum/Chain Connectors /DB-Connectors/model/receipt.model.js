"use strict";
const dbInfo = require("./config");
const Sequelize = require("sequelize");

module.exports = sequelize => {
  return sequelize.define(
    dbInfo.TABLE_RECEIPT,
    {
      receipt_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      blockHash: {
        type: Sequelize.TEXT
      },
      blockNumber: {
        type: Sequelize.TEXT
      },
      contractAddress: {
        type: Sequelize.TEXT
      },
      cumulativeGasUsed: {
        type: Sequelize.TEXT
      },
      creates: {
        type: Sequelize.TEXT
      },
      from: {
        type: Sequelize.TEXT
      },
      gasUsed: {
        type: Sequelize.TEXT
      },
      logsBloom: {
        type: Sequelize.TEXT
      },
      root: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.TEXT
      },
      transactionHash: {
        type: Sequelize.TEXT
      },
      transactionIndex: {
        type: Sequelize.TEXT
      }
    },
    {
      schema: dbInfo.DB_SCHEMA,
      tableName: dbInfo.TABLE_RECEIPT,
      timestamps: false
    }
  );
};
