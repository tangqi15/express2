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

async function connect() {
  // 测试连接  是否成功
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connect();

// const mysql = require("mysql");
// const config = require("./config");

// const pool = mysql.createPool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
//   port: config.db.port,
//   connectionLimit: config.db.connectionLimit,
// });

// module.exports = {
//   query: function (sql, params) {
//     return new Promise((resolve, reject) => {
//       pool.getConnection(function (err, connection) {
//         if (err) {
//           reject(err);
//         } else {
//           connection.query(sql, params, function (err, rows) {
//             if (err) {
//               reject(err);
//             } else {
//               resolve(rows);
//             }
//             connection.release();
//           });
//         }
//       });
//     });
//   },
//   close: function () {
//     pool.end();
//   },
// };
