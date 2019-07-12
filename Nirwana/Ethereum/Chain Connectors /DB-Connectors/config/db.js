"use strict";
const sequelize = require("../DBConfig");
var schedulerInvoker = require("../scheduler/SchedulerInvoker");
var configHandler = require("../utils/ConfigHandler");

const db = {};

db.sequelize = sequelize;

/******************** User *************************/
// db.Users = require("../model/user/user.model")(sequelize);
// db.Users.sync({ force: false });

schedulerInvoker.invokeSchedulers(db);
configHandler.fetchCongig(db);

module.exports = db;
