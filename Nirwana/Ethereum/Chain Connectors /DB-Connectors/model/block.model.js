"use strict";
const dbInfo = require("./config");
const Sequelize = require("sequelize");

module.exports = sequelize => {
  return sequelize.define(
    dbInfo.TABLE_BLOCK,
    {
      block_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: Sequelize.TEXT
      },
      difficulty: {
        type: Sequelize.TEXT
      },
      extraData: {
        type: Sequelize.TEXT
      },
      gasLimit: {
        type: Sequelize.NUMERIC
      },
      gasUsed: {
        type: Sequelize.NUMERIC
      },
      hash: {
        type: Sequelize.TEXT
      },
      logsBloom: {
        type: Sequelize.TEXT
      },
      number: {
        type: Sequelize.NUMERIC
      },
      parentHash: {
        type: Sequelize.TEXT
      },
      receiptsRoot: {
        type: Sequelize.TEXT
      },
      sealFields: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      sha3Uncles: {
        type: Sequelize.TEXT
      },
      signature: {
        type: Sequelize.TEXT
      },
      size: {
        type: Sequelize.TEXT
      },
      stateRoot: {
        type: Sequelize.TEXT
      },
      setp: {
        type: Sequelize.NUMERIC
      },
      timestamp: {
        type: Sequelize.NUMERIC
      },
      totalDifficulty: {
        type: Sequelize.TEXT
      },
      transactions: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      transactionsRoot: {
        type: Sequelize.TEXT
      },
      uncles: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      }
    },
    {
      schema: dbInfo.DB_SCHEMA,
      tableName: dbInfo.TABLE_BLOCK,
      timestamps: false
    }
  );
};
