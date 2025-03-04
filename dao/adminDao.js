// 负责和数据库打交道

const adminModel = require("./model/adminModel");

// 登录
module.exports.loginDao = async function (loginInfo) {
  const result = await adminModel.findOne({
    where: {
      loginId: loginInfo.loginId,
      loginPwd: loginInfo.loginPwd, // md5 加密
    },
  });
  return result;
};

// 更新
module.exports.updateAdminDao = async function (updateInfo) {
  const result = await adminModel.update(
    {
      loginPwd: updateInfo.loginPwd,
      name: updateInfo.name,
    },
    {
      where: {
        loginId: updateInfo.loginId,
      },
    }
  );
  return result;
};
