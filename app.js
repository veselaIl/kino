const fs = require('fs');
var createError = require('http-errors');
var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var logger = require('morgan');
//var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/kino');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//bootstrap
var popper = require('popper.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'myKey_xsjdhHDmdjsd@&$$_+)&^',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000*60*60*24*30 // 30 day
  }
}));

// add db to the request
app.use(function(req, res, next) {
  req.db = db;
  next();
});
///app.use(authRouters);

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
fs.readdirSync(path.join(__dirname, 'routes'))
  .forEach(file => {
    console.log(file);
    var filename = path.basename(file, '.js');
    if (filename !== 'authentication') {
      app.use(require('./routes/' + filename));
    }
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
