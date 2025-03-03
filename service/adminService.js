// admin 模块的业务逻辑层
const { loginDao } = require('../dao/adminDao');
const md5 = require('md5');


module.exports.loginService = async function (loginInfo) {
    loginInfo.loginPwd = md5(loginInfo.loginPwd); // 进行加密
    // 接下来进行数据的验证，也就是查询该条数据在数据里里面是否存在
    const res = await loginDao(loginInfo);
    if (res && res.dataValues) {
        // 添加token
    }
    // 返回一个对象
    return { res };
}