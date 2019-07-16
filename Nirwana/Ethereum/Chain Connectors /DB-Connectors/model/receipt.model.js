"use strict";
const dbInfo = require("./config");
const Sequelize = require("sequelize");

module.exports = sequelize => {
  return sequelize.define(
    dbInfo.TABLE_RECEIPT,
    {
      blockHash: {
        type: Sequelize.TEXT
      },
      blockNumber: {
        type: Sequelize.BIGINT
      },
      contractAddress: {
        type: Sequelize.TEXT
      },
      cumulativeGasUsed: {
        type: Sequelize.BIGINT
      },
      creates: {
        type: Sequelize.TEXT
      },
      from: {
        type: Sequelize.TEXT
      },
      gasUsed: {
        type: Sequelize.INTEGER
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
