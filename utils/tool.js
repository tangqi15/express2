const jwt = require("jsonwebtoken");
const md5 = require("md5");
const multer = require("multer"); // 上传文件库
const path = require("path");
// 格式化要响应的数据
module.exports.formatResponse = function (code, msg, data) {
  return {
    code: code,
    msg: msg,
    data: data,
    status: "OK",
  };
};

// 解析token
module.exports.analysisToken = function (token) {
  const jwtToken = jwt.verify(token.split(" ")[1], md5(process.env.JWT_SECRET));
  return jwtToken;
};

// 梳理数组类型的响应数据
module.exports.handleDataPattern = function (data) {
  const arr = [];
  for (const i of data) {
    arr.push(i.dataValues);
  }
  return arr;
};

// 设置上传文件引擎
// https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
const storage = multer.diskStorage({
  // 文件存储的位置
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../public/static/uploads");
  },
  // 上传到服务器的文件， 文件名要做单独处理
  filename: function (req, file, cb) {
    // 获取文件名
    const basename = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    // 获取后缀名
    const extname = path.extname(file.originalname);
    
    // 构建新名称
    const newname =
      basename +
      new Date().getTime() +
      Math.floor(Math.random() * 9000 + 1000) +
      extname;

      
    cb(null, newname);
  },
});

module.exports.uploading = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, // 2M
    files: 1, // 文件个数
  }, // 文件大小限制
});
