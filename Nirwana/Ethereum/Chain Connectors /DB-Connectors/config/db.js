"use strict";
const sequelize = require("../DBConfig");
var Web3Connector = require("../scheduler/Web3Connector");
const db = {};

db.sequelize = sequelize;

/******************** Block *************************/
db.BlockTable = require("../model/block.model.js")(sequelize);
db.BlockTable.sync({ force: false });

/******************** User *************************/
db.Transaction = require("../model/transaction.model")(sequelize);
db.Transaction.sync({ force: false });

db.Receipt = require("../model/receipt.model")(sequelize);
db.Receipt.sync({ force: false });

db.Logs = require("../model/logs.model")(sequelize);
db.Logs.sync({ force: false });

Web3Connector.invoke(db);
module.exports = db;
