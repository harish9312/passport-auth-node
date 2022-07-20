"use strict";

var jwt = require('jsonwebtoken');

var getJWT = function getJWT() {
  return jwt.sign({
    username: "harishsoni",
    email: "harish"
  }, 'myKey', {
    expiresIn: '1h'
  });
}; // console.log('getJWT', getJWT());


module.exports = getJWT;