"use strict";
const sequelize = require("../DBConfig");
var schedulerInvoker = require("../scheduler/SchedulerInvoker");
var configHandler = require("../utils/ConfigHandler");

const db = {};

db.sequelize = sequelize;

/******************** User *************************/
db.BlockTable = require("../model/block.model.js")(sequelize);
db.BlockTable.sync({ force: false });

schedulerInvoker.invokeSchedulers(db);
configHandler.fetchCongig(db);

module.exports = db;
