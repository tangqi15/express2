// 该文件负责 给数据做一个初始化操作
const sequelize = require("./dbConnection"); // 数据库连接实例
const adminModel = require("./model/adminModel"); // 导入模型
const md5 = require("md5"); // 导入md5加密模块

(async function () {
  //模型同步

  // User.sync() - 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
  // User.sync({ force: true }) - 将创建表,如果表已经存在,则将其首先删除
  // User.sync({ alter: true }) - 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等)
  // ,然后在表中进行必要的更改以使其与模型匹配.
  await sequelize.sync({
    alter: true,
  });

  //   同步完成后，有一些表需要进行一些初始化操作
  // 我们需要先查询表有没有内容，如果没有，则插入一些默认数据
  const adminCount = await adminModel.count();
  console.log(adminCount, "adminCount");

  if (!adminCount) {
    await adminModel.create({
      loginId: "admin",
      name: "超级管理员",
      loginPwd: md5("123456"),
    });
    console.log("初始化管理员成功");
  }
  console.log("数据库数据已经准备完毕。。。");
  
})();
