"use strict";

var db = require("../models");

var User = db.user;

var passportLocal = require('../config/passportLocal');

var passportJwt = require('../config/passportJWT');

var getJWT = require("../genJWT");

function create(req, res) {
  var userdata = {
    username: req.body.username,
    password: req.body.password
  };
  console.log('>> User', User);
  User.create(userdata).then(function (data) {
    return res.send(data);
  })["catch"](function (err) {
    console.warn(err);
  });
}

function getUser(req, res) {
  var userData;
  return regeneratorRuntime.async(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.params.id) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", res.send("ID is Required"));

        case 2:
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findByPk(req.params.id));

        case 5:
          userData = _context.sent;
          return _context.abrupt("return", res.send({
            status: 'valid',
            data: userData
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}

function loginWithPassport(req, res) {
  return regeneratorRuntime.async(function loginWithPassport$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(passportLocal.authenticate('local', function (err, response) {
            if (response) {
              return res.send({
                msg: "Login Success",
                token: getJWT()
              });
            }

            if (!response) {
              return res.send({
                msg: "Failed"
              });
            }
          })(req, res));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function routeWithPassportJWT(req, res) {
  return regeneratorRuntime.async(function routeWithPassportJWT$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(passportJwt.authenticate('jwt', {
            session: false
          }, function (err, response) {
            if (response) {
              return res.send({
                msg: "Route Success"
              });
            }

            return res.send({
              msg: "Route Failed",
              err: err
            });
          })(req, res));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function checkOTP(req, res) {
  var otp = req.body.otp;

  if (otp === '123') {
    return res.send({
      msg: 'SUCcess'
    });
  }

  return res.send({
    err: true
  });
}

module.exports = {
  create: create,
  getUser: getUser,
  loginWithPassport: loginWithPassport,
  routeWithPassportJWT: routeWithPassportJWT,
  checkOTP: checkOTP
};