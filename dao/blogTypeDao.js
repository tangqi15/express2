const blogTypeModel = require("./model/blogTypeModel");

// 添加博客分类
module.exports.addBlogTypeDao = async function (newBlogTypeInfo) {
  const result = await blogTypeModel.create(newBlogTypeInfo);
  return result.dataValues;
};

module.exports.findAllTypeDao = async function () {
  const result = await blogTypeModel.findAll();
  return result;
};

module.exports.findOneBlogTypeDao = async function (id) {
  const { dataValues } = await blogTypeModel.findByPk(id);
  return dataValues;
};

module.exports.updateBlogTypeDao = async function (id, blogTypeInfo) {
  await blogTypeModel.update(blogTypeInfo, {
    where: {
      id,
    },
  });

  const { dataValues } = await blogTypeModel.findByPk(id);
  return dataValues;
};

module.exports.deleteBlogTypeDao = async function (id) {
  const result = await blogTypeModel.destroy({
    where: {
        id
    }
  });
  return result;
};

// 根据id 新增对应的文章分类的  文章数量
module.exports.addBlogToType = async function(id) {
  const data = await blogTypeModel.findByPk(id);
  data.articleCount++;
  await data.save();
  return;
}