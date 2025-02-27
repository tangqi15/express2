var express = require('express');
var router = express.Router();
const { loginService } = require('../service/adminService');

console.log(123123);

/* GET home page. */
router.post('/login', function(req, res, next) {
    // 首先应该有一个验证码的验证   TODO
    loginService(req.body);
    // 然后应该有一个用户名和密码的验证
    res.send('respond with a resource');
});

module.exports = router;
