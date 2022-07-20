"use strict";

var passport = require('passport');

var JwtStratery = require('passport-jwt').Strategy;

var ExtractJwt = require('passport-jwt').ExtractJwt;

var db = require('../models');

var JWT_KEY = 'myKey';
var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWT_KEY;
passport.use(new JwtStratery(options, function _callee(jwtPayload, done) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.user.findByPk(jwtPayload.username).then(function (data) {
            if (!data) {
              return done(null, null);
            }

            return done(null, data);
          })["catch"](function (err) {
            throw err;
          }));

        case 2:
          return _context.abrupt("return", done(null, null));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}));
module.exports = passport;