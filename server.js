var pug = require('pug');
var path = require('path');
var express = require('express');

var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/reviews', function(req, res) {
  res.render('reviews');
})

app.get('/reviews/new', function(req, res) {
  res.render('newReview');
})

var server = app.listen(3000, function () {
  console.log("App listening on port " + server.address().port);
});