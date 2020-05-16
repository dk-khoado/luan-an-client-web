var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var tempdata = require('tempdata');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var managerRouter = require('./routes/manager');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('trust proxy', 1)

app.use(expressLayouts);
app.set('layout', "layouts/layoutHome");
app.set("layout extractScripts", true)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser("adb123"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "abc123",
  resave: true,
  saveUninitialized: false
}));
app.use(tempdata);

//message system
app.use((req, res, next) => {
  res.message = {
    error: function (message = null) {
      req.tempData.set("error", message);
      res.locals.msgError = message;
    },
    warning: function (message = null) {
      req.tempData.set("warning", message);
      res.locals.msgWarning = message;
    },
    success: function (message = null) {
      req.tempData.set("success", message);
      res.locals.msgSuccess = message;
    },
    info: function (message = null) {
      req.tempData.set("info", message);
      res.locals.msgInfo = message;
    }
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/manager', managerRouter);

app.use('/tools', require('./routes/tools'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error/errorpage');
});

module.exports = app;
