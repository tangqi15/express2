// 负责数据库连接
const { Sequelize } = require("sequelize");

// 创建数据库连接

// 方法 3: 分别传递参数 (其它数据库)
// process  访问环境变量
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  logging: false, // log 在控制台不显示
});

// 向外暴露连接实例
module.exports = sequelize;
