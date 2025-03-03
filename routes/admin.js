var express = require('express');
var router = express.Router();
const { formatResponse, analysisToken } = require("../utils/tool");
const { loginService } = require('../service/adminService');

/* POST  登录 */
router.post('/login', async function(req, res, next) {
    // 首先应该有一个验证码的验证   TODO
    const result = await loginService(req.body);
    // 然后应该有一个用户名和密码的验证
    if (result.token) {
        res.setHeader("authorization", result.token);
    }
    res.send(formatResponse(0, "", result));
});

// 恢复登录状态
router.get('/whoami', async function(req, res, next) {
    // 取出token  验证
    const token = req.get("Authorization");
    // 解析token   还原成有用的信息
    const realToken = analysisToken(token);
    // 返回给客户端
    res.send(formatResponse(0, "", {
        "loginId": realToken.loginId,
        "name": realToken.name,
        "id": realToken.id,
    }))
})

module.exports = router;