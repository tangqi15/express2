const { ValidationError } = require("../utils/errors");
const { getBlogListDao, addBlogDao , getBlogOneDao, updateBlogInfoDao, deleteBlogInfoDao} = require("../dao/blogDao");
const { addBlogToType } = require("../dao/blogTypeDao");
const { formatResponse, handleDataPattern } = require("../utils/tool");
const { validate } = require("validate.js");
const blogTypeModel = require("../dao/model/blogTypeModel");

// 拓展验证
validate.validators.categoryIdIsExist = async function (value) {
  const blogTypeInfo = await blogTypeModel.findByPk(value);
  if (blogTypeInfo) {
    return;
  }
  return "CategoryId Is Not Exist";
};
// 添加博客
module.exports.addBlogService = async function (newBlogInfo) {
  // 处理 toc 目录  TODO

  // 将处理好的 toc 格式转为 字符串  MOCK
  newBlogInfo.toc = JSON.stringify('["a", "b]');

  // 默认值初始化
  newBlogInfo.scanNumber = 0; // 初始阅读量
  newBlogInfo.commentNumber = 0; // 初始评论量

  // rule
  const blogRule = {
    title: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    description: {
      presence: {
        allowEmpty: true,
      },
      type: "string",
    },
    createDate: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },

    toc: {
      presence: {
        allowEmpty: true,
      },
      type: "string",
    },
    htmlContent: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    thumb: {
      presence: {
        allowEmpty: true,
      },
      type: "string",
    },
    scanNumber: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    commentNumber: {
      presence: {
        allowEmpty: false,
      },
      type: "integer",
    },
    categoryId: {
      presence: true,
      type: "string", // 允许整数或字符串类型
      categoryIdIsExist: true,
    },
  };

  // 验证
  try {
    // 异步验证   拓展验证中  涉及到 异步， 所以这里也要采用异步的方式
    await validate.async(newBlogInfo, blogRule);
    // 同步验证
    // await validate.validate(newBlogInfo, blogRule);
  } catch (e) {
    console.log(e, "错误");
    // 验证未通过
    throw new ValidationError("数据验证失败");
  }

  // 新增文章
  const data = await addBlogDao(newBlogInfo);
  // 对应文章分类 新增
  await addBlogToType(newBlogInfo.categoryId);
  return formatResponse(0, "", data);
};

// 获取分页文章列表
module.exports.getBlogListService = async function (query) {
  const result = await getBlogListDao(query);
  //   处理 返回内容
  const rows = handleDataPattern(result.rows);
//   针对 TOC 目录要做一个还原的操作
rows.forEach(it => {
    it.toc = JSON.parse(it.toc);
})
  return formatResponse(0, "", {
    "total": result.count,
    "rows": rows
  });
};

// 获取其中一个文章
module.exports.findBlogByIdService = async function(id, authorization) {
    const result = await getBlogOneDao(id);
    // toc 数据处理
    result.dataValues.toc = JSON.parse(result.dataValues.toc);
    // 浏览器量+1；
    if (authorization) {
        // 如果有鉴权
        result.scanNumber++;
        await result.save();
    }
    return formatResponse(0, "", result)
}
// 修改其中一个文章
module.exports.updateBlogService = async function(newBlogInfo) {
    const result = await updateBlogInfoDao(newBlogInfo);
    console.log(result, 'result');
    return formatResponse(0, "", result)
}
// 删除其中一个文章
module.exports.deleteBlogService = async function(id) {
    const result = await deleteBlogInfoDao(id);
    return formatResponse(0, "", result)
}