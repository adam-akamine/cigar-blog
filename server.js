var pug = require('pug');
var path = require('path');
var express = require('express');

var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static('public'));
app.set('view-engine', 'pug');

var server = app.listen(3000, function () {
  console.log("App listening on port " + server.address().port);
});