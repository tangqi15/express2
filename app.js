var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// 默认读取项目根目录 .env 环境变量
require('dotenv').config(); // 引入环境变量
// 引入数据库连接
require('./dao/db');

// 引入路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');


// 创建服务器实例
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// 设置模版引擎
// app.set('view engine', 'jade');


// 使用各种各样的中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用路由中间件
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/admin', adminRouter); // localhost:3000/admin/***

// 错误处理
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
