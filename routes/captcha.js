// 验证码 模块

let express = require("express");
let router = express.Router();
const { getCaptchaService } = require("../service/captchaService");

// 获取验证码
router.get("/", async function (req, res, next) {
  // 生成验证码
  const captcha = await getCaptchaService();
  // TODO  为什么是  req 设置   
  req.session.captcha = captcha.text;
  // 设置响应头
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(captcha.data); // data 里面存的图
});

module.exports = router;
