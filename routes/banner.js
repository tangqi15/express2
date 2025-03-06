var express = require("express");
var router = express.Router();
const { findBannerService, updateBannerService } = require("../service/bannerService");
// 获取 首页标语
router.get("/", async function (req, res, next) {
  const resSend = await findBannerService();
  res.send(resSend)
});

// 设置 首页标语
router.post("/", async function (req, res, next) {
    const resSend = await updateBannerService(req.body);
    res.send(resSend)
});

module.exports = router;
