"use strict";

// project/config/passportLocal.js
var passport = require('passport');

var LocalStratery = require('passport-local').Strategy;

var db = require('../models'); // Creating the passport instance to be used from the controller.


passport.use(new LocalStratery({
  // if you use any different name for the username field, you can pass the key here
  usernameField: 'username'
}, function _callee2(username, password, done) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db.user.findByPk(username).then(function _callee(data) {
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (data) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return", done(null, null));

                  case 2:
                    _context.next = 4;
                    return regeneratorRuntime.awrap(data.comparePassowrd(password, function (err, userData) {
                      return done(null, userData);
                    }));

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })["catch"](function (err) {
            throw err;
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
})); // For Storing the user id in the session {req.session.passport.user = {id: '..'}}

passport.serializeUser(function (user, cb) {
  cb(null, user);
}); // For checking if the user has an active session.

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
module.exports = passport;