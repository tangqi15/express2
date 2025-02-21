const { DataTypes } = require('sequelize');

// 连接实例
const sequelize = require('../dbConnection');

// 定义模型
// module.exports = sequelize.isDefined("admin", {
module.exports = sequelize.define("admin", {
    // 表字段
    loginId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    createdAt: false, // createdAt 字段不要
    updatedAt: false, // updatedAt 字段不要
}
)