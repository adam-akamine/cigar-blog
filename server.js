var pug = require('pug');
var path = require('path');
var express = require('express');
var multiparty = require('multiparty');
var cloudinary = require('cloudinary');
var cloudConfig = require('./config/cloudConfig');

var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

cloudinary.config({
  cloud_name: cloudConfig.name,
  api_key: cloudConfig.key,
  api_secret: cloudConfig.secret
});

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/reviews', function(req, res) {
  res.render('reviews');
})

app.get('/reviews/new', function(req, res) {
  res.render('newReview');
})

app.post('/reviews', function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if(err)
      throw err;
    if(files.pic[0].size) {
      cloudinary.uploader.upload(files.pic[0].path, function (result) {
        return Pics.create({fileName: result.url})
        .then(function(cloudPic) {
          Reviews.create({
            pic_id: cloudPic.id,

          })
        })
      })
    }
  })
})

var server = app.listen(3000, function () {
  console.log("App listening on port " + server.address().port);
});