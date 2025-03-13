const blogModel = require("./model/blogModel");
const blogTypeModel = require("./model/blogTypeModel");

// 添加博客
module.exports.addBlogDao = async function (newBlogInfo) {
  const { dataValues } = await blogModel.create(newBlogInfo);
  return dataValues;
};

// 根据 id  新增对应文章分类的 文章数量
module.exports.addBlogToType = async function(id) {
    const data = await blogTypeModel.findByPk(id);
    data.articleCount++;
    await data.save();
    return;
}


// 分页查询列表
module.exports.getBlogListDao = async function (queryInfo) {
  // { page: '1', limit: '5', categoryid: '2' }
  //   await blogModel;

  // 如果 分类id(categoryid)存在  根据分类信息 分页，  如果分类id(不存在) 根据全部分类分页

  if (queryInfo?.categoryid !== "-1") {
    return await blogModel.findAndCountAll({
      include: [
        {
          model: blogTypeModel,
          as: "category",
          where: {
            id: pageInfo.categoryid,
          },
        },
      ],
      offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
      limit: pageInfo.limit * 1,
    });
  } else {
    // 根据所有博客
    return await blogModel.findAndCountAll({
      include: [
        {
          model: blogTypeModel,
          as: "category",
        },
      ],
      offset: (queryInfo.page * 1 - 1) * pageInfo.limit,
      limit: queryInfo.limit * 1,
    });
  }
};
