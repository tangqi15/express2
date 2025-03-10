var express = require("express");
var router = express.Router();
const { uploading, formatResponse } = require("../utils/tool");
const multer = require("multer");
const { UploadError } = require("../utils/errors");

router.post("/", async function (req, res, next) {
  // single 方法 参数：  上传控件的 file   vue中 文件input name=“file”
  uploading.single("file")(req, res, function (err) {
    if (!req.file) {
      res.send(formatResponse(400, "未接收到文件"));
      return;
    }

    if (err instanceof multer.MulterError) {
      // 上传文件出错
      next(new UploadError("上传文件失败,请检查文件大小，要求文件2M以内"));
    } else if (err) {
      next(new UploadError("其他错误"));
    } else {
      // 上传成功
      const path = "/static/uploads/" + req.file.filename;
      res.send(formatResponse(0, "", path));
    }
  });
});

module.exports = router;
