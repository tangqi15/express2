var express = require('express');
var router = express.Router();
const {addBlogTypeService, findAllBlogTypeService, findOneBlogTypeService, updateBlogTypeService, deleteBlogTypeService} = require('../service/blogTypeService');



// 添加博客分类
router.post('/addBlogType', async function(req, res, next) {
    res.send(await addBlogTypeService(req.body));
})

// 获取博客分类
router.get('/getAllBlogType', async function(req, res, next) {
    res.send(await findAllBlogTypeService());
})

// 获取其中一个 博客分类    http://localhost:3001/api/blogType/getBlogType/1
router.get('/getBlogType/:id', async function(req, res, next) {
    console.log(req, 'ccccc');
    res.send(await findOneBlogTypeService(req.params.id));
})

router.get('/getBlogTypeBody', async function(req, res, next) {
    res.send(await findOneBlogTypeService(req.query.id));
})


// 修改其中一个博客分类
router.put('/:id', async function(req, res, next) {
    res.send(await updateBlogTypeService(req.params.id, req.body));
})

// 删除其中一个博客分类
router.delete('/:id', async function(req, res, next) {
    res.send(await deleteBlogTypeService(req.params.id));
})

module.exports = router;