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
module.exports.getBlogListDao = async function (pageInfo) {
  // { page: '1', limit: '5', categoryId: '2' }
  //   await blogModel;

  // 如果 分类id(categoryId)存在  根据分类信息 分页，  如果分类id(不存在) 根据全部分类分页

  if (pageInfo?.categoryId !== "-1") {
    return await blogModel.findAndCountAll({
      // 关联查询
      include: [
        {
          model: blogTypeModel,
          as: "category",
          where: {
            id: pageInfo.categoryId,
          },
        },
      ],
      //offset: 跳过多少条 page 是字符串  * 1  转数字
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

// 获取其中一个文章
module.exports.getBlogOneDao = async function(id) {
  const data = await blogModel.findByPk(id);
  return data;
}

// 更新 其中一个文章
module.exports.updateBlogInfoDao = async function(newBlogInfo) {
  const data = await blogModel.update(newBlogInfo, {
    where: {
      id: newBlogInfo.id
    }
  });
  return data;
}

// 删除一篇文章
module.exports.deleteBlogInfoDao = async function(id){
  return await blogModel.destroy({
      where : {
          id
      }
  })
}
