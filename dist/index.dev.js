"use strict";

var express = require('express');

var db = require('./models');

var cors = require('cors');

var app = express();
var port = 3000;
app.use(express.json());
app.use(cors());
db.sequelize.sync().then(function () {
  console.log("Synced");
})["catch"](function (err) {
  return console.err(err);
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});

require('./routes/user.route')(app);

app.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});