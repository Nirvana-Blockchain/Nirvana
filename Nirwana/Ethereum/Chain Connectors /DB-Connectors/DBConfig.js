const Sequelize = require("sequelize");

var envconfig = require("./ServerConfig");

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
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
