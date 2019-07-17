"use strict";
const sequelize = require("../DBConfig");
var schedulerInvoker = require("../scheduler/SchedulerInvoker");
var configHandler = require("../utils/ConfigHandler");

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

module.exports = db;
