var pug = require('pug');
var path = require('path');
var express = require('express');
var multiparty = require('multiparty');
var cloudinary = require('cloudinary');
var cloudConfig = require('./config/cloudConfig');
var db = require('./models');
var dateFormat = require('dateformat');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var methodOverride = require('method-override');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var CONFIG = require('./config/config');

var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session(
  {
    secret: CONFIG.SESSION.secret,
    saveUninitialized: CONFIG.SESSION.saveUninitialized,
    resave: CONFIG.SESSION.resave,
    store : new RedisStore({ttl: 300})
  })
);

var Reviews = db.Reviews;
var Pics = db.Pics;
var Users = db.Users;

cloudinary.config({
  cloud_name: cloudConfig.name,
  api_key: cloudConfig.key,
  api_secret: cloudConfig.secret
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("username: ", username);
    console.log("password: ", password);
    // var isAuthenticated;
    User.findOne({
      where: {
        name: username,
        password: password
      }
    }).then(function (user) {
      if(user) {
        console.log("user found");
        return done(null, user);
      }
      else {
        console.log("user not found");
        return done(null, false);
      }
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
}); //this gets saved into session store

passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(function (user) {
      return done(null, (user && user.toJSON()));
    })
    .catch(function(err) {
      return done(err);
    });
}); // this becomes req.user

function isAuthenticated (req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return next();
}

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}))

app.get('/reviews', function(req, res) {
  Reviews.findAll({
    order:'id ASC',
    limit: 9,
    include: {
      model: Pics,
      as: 'pic',
    }
  }).then(function(review) {
    console.log(review);
    for(var i = 0; i < review.length; i++) {
      review[i].dataValues.reviewDate = dateFormat(review[i].dataValues.reviewDate, "mmmm dS, yyyy");
    }
    res.render('reviews', {json: review});
  });
});

app.get('/reviews/new', function(req, res) {
  res.render('newReview');
})

app.get('/successReview', function(req, res) {
  res.render('successReview');
})

app.get('/reviews/:id', function(req, res) {
  var reviewId = parseInt(req.params.id);
  console.log("ID: " + reviewId);
  Reviews.findOne({
    where: {
      id: reviewId
    },
    include: [{
      model: Pics,
      as: 'pic'
    }]
  }).then(function (review) {
    if(!review) {
      console.log("Review not found");
      res.render('404');
    }
    console.log(review.dataValues)
    var formattedDate = dateFormat(review.reviewDate, "mmmm dS, yyyy");
    res.render('fullReview', {json: review, reviewDate: formattedDate});
  });
});

app.get('/404', function(req, res) {
  res.render('404');
})

app.post('/reviews', function(req, res) {
  var form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    if(err)
      throw err;
    if(files.pic[0].size) {
      // console.log(files);
      cloudinary.uploader.upload(files.pic[0].path, function (result) {
        return Pics.create({filename: result.url})
        .then(function(cloudPic) {
          Reviews.create({
            picFileName: cloudPic.id,
            author: fields.author[0],
            reviewText: fields.reviewText[0],
            reviewDate: fields.reviewDate[0],
            cigarName: fields.cigarName[0],
            brand: fields.brand[0],
            size: fields.size[0],
            shape: fields.shape[0],
            price: fields.price[0],
            flavors: fields.flavors[0],
            smokeTime: fields.smokeTime[0],
            grade: fields.grade[0]
          })
          .then(function(review) {
            return res.render('successReview');
          })
        })
      })
    }
  })
})

app.get('/reviews/:id/edit', function(req, res) {
  var reviewId = parseInt(req.params.id);
  console.log("ID: " + reviewId);
  Reviews.findOne({
    where: {
      id: reviewId
    },
    include: [{
      model: Pics,
      as: 'pic'
    }]
  }).then(function (review) {
    if(!review) {
      console.log("Review not found");
      res.render('404');
    }
    console.log(review.pic.dataValues);
    var formattedDate = dateFormat(review.reviewDate, "mmmm dS, yyyy");
    res.render('edit', {json: review, reviewDate: formattedDate, id: parseInt(req.params.id)});
  });
});

app.put('/reviews/:id/edit', function(req,res) {
  var reviewId = parseInt(req.params.id);
  console.log("ID: " + reviewId);
  Reviews.findOne({
    where: {
      id: parseInt(req.params.id)
    },
    include: [{
      model: Pics,
      as: 'pic'
    }]
  }).then(function(review) {
    if(!review) {
      console.log("Review not found");
      res.render('404');
    }
    return review.updateAttributes({
      picFileName: review.picFileName,
      author: req.body.author,
      reviewText: req.body.reviewText,
      reviewDate: req.body.reviewDate,
      cigarName: req.body.cigarName,
      brand: req.body.brand,
      size: req.body.size,
      shape: req.body.shape,
      price: req.body.price,
      flavors: req.body.flavors,
      smokeTime: req.body.smokeTime,
      grade: req.body.grade
    }).then(function(review) {
      Pics.findOne({
        where: {
          id: review.id
        }
      }).then(function(pic) {
        if(!pic) {
          console.log("Pic not found");
          res.render('404');
        }
        return pic.updateAttributes({
          filename: req.body.picFileName
        })
      }).then(function(pic) {
        return res.render('successReview');
      })
    })
  })
});

app.get('*', function(req, res) {
  res.render('404');
})

var server = app.listen(3000, function () {
  console.log("App listening on port " + server.address().port);
});