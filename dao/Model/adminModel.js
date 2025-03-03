const { DataTypes } = require('sequelize');

// 连接实例
const sequelize = require('../dbConnection');

// 定义模型
module.exports = sequelize.define("admin", {
    // 表字段
    loginId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    freezeTableName: true,
    createdAt: false, // createdAt 字段不要
    updatedAt: false, // updatedAt 字段不要
}
)