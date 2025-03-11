const { ValidationError } = require("sequelize");
const { validate } = require("validate.js");
const { addBlogTypeDao, findAllTypeDao, findOneBlogTypeDao, updateBlogTypeDao, deleteBlogTypeDao } = require("../dao/blogTypeDao");
const { formatResponse, handleDataPattern } = require("../utils/tool");
// 新增博客分类
module.exports.addBlogTypeService = async function (newBlogTypeInfo) {
  // 数据验证规则
  const blogTypeRule = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
    order: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
    },
  };
  // 进行数据验证
  const validateResult = validate.validate(newBlogTypeInfo, blogTypeRule);
  console.log(validateResult, "validateResult====");
  // 验证通过  validateResult  是 undefined
  if (!validateResult) {
    // 验证通过
    newBlogTypeInfo.articleCount = 0; // 因为是新增文章分类，所以一开始文章数量为 0

    const result = await addBlogTypeDao(newBlogTypeInfo);
    return formatResponse(0, "", result);
  } else {
    // 数据验证事变
    throw new ValidationError("数据验证失败");
  }
};
 
// 查询素有博客分类
module.exports.findAllBlogTypeService = async function () {
    const data = await findAllTypeDao();
    
    const obj = formatResponse(0, "", handleDataPattern(data));
    // 排序
    obj.data.sort((a, b) => a.order - b.order);
    return formatResponse(0, "", obj);
};

// 获取其中一个博客分类
module.exports.findOneBlogTypeService = async function (id) {
  const data = await findOneBlogTypeDao(id);
  return formatResponse(0, "", data);
};

// 修改其中一个博客分类
module.exports.updateBlogTypeService = async function (id, newBlogTypeInfo) {
  const data = await updateBlogTypeDao(id, newBlogTypeInfo);
  return formatResponse(0, "", data);
};

// 删除其中一个博客分类
module.exports.deleteBlogTypeService = async function (id) {
  await deleteBlogTypeDao(id);
  // 这里需要返回 受影响的文章的数量， 写了文章模块后  回来修改
  return formatResponse(0, "", true);
};
