"use strict";

var dbConfig = require('../db.config');

var Sequelize = require('sequelize');

var sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  operatorAliases: false,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});
var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user.model.js')(sequelize, Sequelize);
module.exports = db;