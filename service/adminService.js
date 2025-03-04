// admin 模块的业务逻辑层
const { loginDao, updateAdminDao } = require("../dao/adminDao");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { ValidationError } = require("../utils/error");
const { formatResponse } = require("../utils/tool");
// 登录
module.exports.loginService = async function (loginInfo) {
  loginInfo.loginPwd = md5(loginInfo.loginPwd); // 进行加密
  // 接下来进行数据的验证，也就是查询该条数据在数据里里面是否存在
  let res = await loginDao(loginInfo);
  if (res && res.dataValues) {
    let resData = {
      id: res.dataValues.id,
      loginId: res.dataValues.loginId,
      name: res.dataValues.name,
    };
    // 添加token   依赖三方包  jsonwebtoken
    // 如果请求体中不含包 remember 1天， 包含remember 7天；
    let loginPeriod = 1;
    if (loginInfo.remember) {
      // remember 是有值的
      loginPeriod = parseInt(loginInfo.remember);
    }
    // token 有效时长
    let tokenExpiresIn = {
      expiresIn: 60 * 60 * 24 * loginPeriod,
    };
    // 生成  token
    const jwtObj = {
      id: res.id,
      loginId: res.loginId,
      name: res.name,
    };
    // 1、哪些信息加密 是返回给客户端的。
    // 2、 秘钥
    // 3、 时长
    const token = jwt.sign(jwtObj, md5(process.env.JWT_SECRET), tokenExpiresIn);

    return {
      token,
      resData,
    };
  }
  // 返回一个对象
  return { res };
};

module.exports.updateAdminService = async function (updateInfo) {
  // 验证旧密码对不对
  const adminInfo = await loginDao({
    loginId: updateInfo.loginId,
    loginPwd: md5(updateInfo.oldLoginPwd),
  });

  if (adminInfo && adminInfo.dataValues) {
    // 密码正确
    await updateAdminDao({
      loginId: adminInfo.loginId,
      name: updateInfo.name,
      loginPwd: md5(updateInfo.loginPwd),
    });
    return formatResponse(0, "修改成功", {
        loginId: updateInfo.loginId,
        name: updateInfo.name,
        loginPwd: updateInfo.loginPwd,
        id: adminInfo.id, // 修改成功后，返回最新的数据
    });
  } else {
    // 旧密码不正确
    throw new ValidationError("旧密码不正确");
  }
};
