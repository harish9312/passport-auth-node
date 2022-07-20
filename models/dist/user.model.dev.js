"use strict";

// project/models/user.model.js
var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
  // To get the feasiblity of the Sequelize ORM
  var User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING
    }
  }); // It will convert each password into the Hashed String for maintaining the security

  User.beforeSave(function (user) {
    if (user.changed('password')) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    }
  }); // It will compare the password to the passed string using the bcrypt algo, and will return the result

  User.prototype.comparePassowrd = function (pass, cb) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }

      cb(null, isMatch);
    });
  };

  return User;
};