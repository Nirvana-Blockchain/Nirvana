"use strict";
const dbInfo = require("./config");
const Sequelize = require("sequelize");

module.exports = sequelize => {
  return sequelize.define(
    dbInfo.TABLE_TRANSACTION,
    {
      blockHash: {
        type: Sequelize.TEXT
      },
      blockNumber: {
        type: Sequelize.BIGINT
      },
      chainId: {
        type: Sequelize.TEXT
      },
      condition: {
        type: Sequelize.TEXT
      },
      creates: {
        type: Sequelize.TEXT
      },
      from: {
        type: Sequelize.TEXT
      },
      gas: {
        type: Sequelize.IN
      },
      gasPrice: {
        type: Sequelize.INTEGER
      },
      hash: {
        type: Sequelize.TEXT
      },
      input: {
        type: Sequelize.TEXT
      },
      nonce: {
        type: Sequelize.TEXT
      },
      publicKey: {
        type: Sequelize.TEXT
      },
      r: {
        type: Sequelize.TEXT
      },
      raw: {
        type: Sequelize.TEXT
      },
      s: {
        type: Sequelize.TEXT
      },
      standardV: {
        type: Sequelize.TEXT
      },
      to: {
        type: Sequelize.TEXT
      },
      transactionIndex: {
        type: Sequelize.TEXT
      },
      v: {
        type: Sequelize.TEXT
      },
      value: {
        type: Sequelize.INTEGER
      }
    },
    {
      schema: dbInfo.DB_SCHEMA,
      tableName: dbInfo.TABLE_TRANSACTION,
      timestamps: false
    }
  );
};
