"use strict";
const dbInfo = require("./config");
const Sequelize = require("sequelize");

module.exports = sequelize => {
  return sequelize.define(
    dbInfo.TABLE_BLOCK,
    {
      block_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: Sequelize.STRING
      },
      difficulty: {
        type: Sequelize.STRING
      },
      extraData: {
        type: Sequelize.STRING
      },
      gasLimit: {
        type: Sequelize.BIGINT
      },
      gasUsed: {
        type: Sequelize.BIGINT
      },
      hash: {
        type: Sequelize.STRING
      },
      logsBloom: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.BIGINT
      },
      parentHash: {
        type: Sequelize.STRING
      },
      receiptsRoot: {
        type: Sequelize.STRING
      },
      sealFields: {
        type: Sequelize.ARRAY
      },
      sha3Uncles: {
        type: Sequelize.STRING
      },
      signature: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      stateRoot: {
        type: Sequelize.STRING
      },
      setp: {
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: Sequelize.BIGINT
      },
      totalDifficulty: {
        type: Sequelize.STRING
      },
      transactions: {
        type: Sequelize.ARRAY
      },
      transactionsRoot: {
        type: Sequelize.STRING
      },
      uncles: {
        type: Sequelize.STRING
      }
    },
    {
      schema: dbInfo.DB_SCHEMA,
      tableName: dbInfo.TABLE_BLOCK,
      timestamps: false
    }
  );
};
