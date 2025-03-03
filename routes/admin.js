var express = require('express');
var router = express.Router();
const { loginService } = require('../service/adminService');

/* GET home page. */
router.post('/login', async function(req, res, next) {
    // 首先应该有一个验证码的验证   TODO
    const results = await loginService(req.body);
    console.log(results, 'results');
    
    // 然后应该有一个用户名和密码的验证
    res.send(results);
});

module.exports = router;
