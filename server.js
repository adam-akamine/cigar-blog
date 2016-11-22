var pug = require('pug');
var path = require('path');
var express = require('express');
var multiparty = require('multiparty');
var cloudinary = require('cloudinary');
var cloudConfig = require('./config/cloudConfig');
var db = require('./models');

var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

var Review = db.Review;
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

app.get('/successReview', function(req, res) {
  res.render('successReview');
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
            author: fields.author[0],
            reviewText: fields.reviewText[0],
            reviewDate: fields.reviewDate[0],
            cigarName: fields.cigarName[0],
            brand: fields.brand[0],
            size: fields.size[0],
            shape: fields.shape[0],
            price: fields.price[0],
            flavors: fields.flavors[0],
            grade: fields.grade[0],
            smokeTime: fields.smokeTime[0],
            picFileName: cloudPic.id
          })
          .then(function(review) {
            return res.render('successReview');
          })
        })
      })
    }
  })
})

var server = app.listen(3000, function () {
  console.log("App listening on port " + server.address().port);
});