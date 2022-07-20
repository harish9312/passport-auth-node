"use strict";

module.exports = function (app) {
  // Import of the controller
  var user = require('../controller/user.controller'); // Creating the router instance


  var router = require('express').Router(); // TO create the user


  router.post('/user', user.create); // To Login the user using Passport Local Strategy

  router.post('/user-passport-login', user.loginWithPassport); // Pass the router instance to the App.

  app.use('/api/v1', router);
  router.get('/user-passport-route', user.routeWithPassportJWT);
  router.get('/user/:id', user.getUser);
  router.post('/checkOTP', user.checkOTP);
};