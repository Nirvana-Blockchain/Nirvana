const Sequelize = require("sequelize");

var envconfig = require("./ServerConfig");
var Web3Connector = require("./scheduler/Web3Connector");
var db = require("./config/db");

const sequelize = new Sequelize(
  envconfig.env.conf.DB_NAME,
  envconfig.env.conf.DB_USER,
  envconfig.env.conf.DB_PASS,
  {
    host: envconfig.env.conf.DB_HOST, //'smdb.cc11whhdotdm.ap-south-1.rds.amazonaws.com',
    dialect: envconfig.env.conf.DIALECT,
    port: 5430,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    Web3Connector.invoke(db);
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
