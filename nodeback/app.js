var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var positionRouter = require('./routes/position');
var positionaddRouter = require('./routes/positionadd');
var activityRouter = require('./routes/activity');
var activityaddRouter = require('./routes/activityadd');
var productsRouter = require('./routes/products');
var productsaddRouter = require('./routes/productsadd');
var productsdetailRouter = require('./routes/productsdetail');
var userspasswordlRouter = require('./routes/userspassword');

var session = require('express-session')
var app = express();

//------------连接数据库---------------------
var mongoose  = require("mongoose");
//mongoose.connect("mongodb://43.226.39.15:8081/nodeback")
mongoose.connect("mongodb://127.0.0.1:27017/nodeback")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//---------express-session-----------------------
app.use(session({
  name: "project1NodeSessID",
  secret:"dw3243dw",
  cookie: {maxAge: 1000*3600 }, //1小时
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/position',positionRouter);
app.use('/positionadd',positionaddRouter);
app.use('/activity', activityRouter);
app.use('/activityadd', activityaddRouter);
app.use('/products',productsRouter);
app.use('/productsadd',productsaddRouter);
app.use('/productsdetail',productsdetailRouter);
app.use('/userspassword',userspasswordlRouter);

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
