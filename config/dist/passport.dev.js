"use strict";

var passport = require('passport');

var LocalStratery = require('passport-local').Strategy;

var db = require('../models');

var User = db.user;
passport.use(new LocalStratery({
  usernameField: 'username'
}, function (username, password, done) {
  db.user.findByPk(username).then(function (data) {
    if (!data) {
      return done(null, null);
    }

    data.comparePassowrd(password, function (err, userData) {
      return done(null, userData);
    });
  })["catch"](function (err) {
    throw err;
  });
  return done(null, null);
}));
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
module.exports = passport;