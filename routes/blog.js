// 文章模块

var express = require("express");
var router = express.Router();

const { getBlogListService, addBlogService } = require("../service/blogService");


// 新增文章
router.post("/", async function(req, res, next){
    res.send(await addBlogService(req.body));
})

// 分页获取文章
router.get("/getBlogList", async function (req, res, next) {
  res.send(await getBlogListService(req.query));
});

// 获取其中一个博客
router.get("/:id", async function(req, res, next){
    const reqHeaders = req.headers;
    res.send(await findBlogByIdService(req.params.id, reqHeaders.authorization));
})

// 修改其中一个博客
router.put("/:id", async function(req, res, next){
    res.send(await updateBlogService(req.params.id, req.body));
})

// 删除其中一个博客
router.delete("/:id", async function(req, res, next){
    res.send(await deleteBlogService(req.params.id));
})

module.exports = router;
