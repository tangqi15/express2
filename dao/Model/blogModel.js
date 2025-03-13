const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");

// 定义 文章数据模型
module.exports = sequelize.define(
  "blog",
  {
    // 文章标题
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 文章描述
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // 文章目录
    toc: {
      type: DataTypes.TEXT, // 大String,  Text
      allowNull: false,
    },
    // 正文
    htmlContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // 缩略图
    thumb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 浏览次数
    scanNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // 评论量
    commentNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // 创建日期
    createDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);
