var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 只需引入即可,在session持久化时，需要
const mongoConnection = require('./database/config')
// const bodyParser = require('body-parser')    //express中间件，对post请求体进行解析
const session = require('express-session')
var MongoStore = require('connect-mongo')(session)

var indexRouter = require('./routes/index');

var app = express();

app.use(session({
  secret: 'zj',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, expires: 1000*60*60*2 },    //true:对应https
  store: new MongoStore({ mongooseConnection: mongoConnection }) 
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
