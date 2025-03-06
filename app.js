var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { expressjwt } = require("express-jwt"); // 验证客户端token
const { ForbiddenError, UnkonwnError, ServiceError } = require("./utils/error");
const session = require('express-session');

// 默认读取项目根目录 .env 环境变量
require('dotenv').config(); // 引入环境变量
// 引入数据库连接
require('./dao/db');
require('express-async-errors'); // 异步错误处理
// 引入路由
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var captchaRouter = require('./routes/captcha');
var bannerRouter = require('./routes/banner');
const md5 = require('md5');

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
app.use(session({
  secret: process.env.SESSION_SECRET, // 秘钥
  resave: true,
  saveUninitialized: true, // 未初始化

}));
// 验证 客户端token  接口
app.use(expressjwt(
  {
    secret: md5(process.env.JWT_SECRET), // 秘钥
    algorithms: ["HS256"],  // 算法(新版本jwt 必须要求指定算法) 
  }
).unless({
  // 需要排除  token验证的 路由
  path: [
    {"url": "/api/admin/login", methods: ["POST"]},
    {"url": "/res/captcha", methods: ["GET"]}
  ] 
}));


// 使用路由中间件
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/admin', adminRouter); // localhost:3000/admin/***
app.use('/res/captcha', captchaRouter);
app.use('/api/banner', bannerRouter);
// 错误处理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler  错误处理， 一旦发生错误，就会到这里来
app.use(function(err, req, res, next) {
  console.log("err.name =============> ", err.name);
  console.log("err.message =============> ", err.message);
  
  if (err.name === "UnauthorizedError") {
    res.send(new ForbiddenError('token 失效，请重新登录').toResponseJSON())
  } else if (err instanceof ServiceError){
    res.send(err.toResponseJSON())
  } else {
    res.send(new UnkonwnError().toResponseJSON())
  }
});

module.exports = app;
