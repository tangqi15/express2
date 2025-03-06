const bannerModel = require('./model/bannerModel');

module.exports.findBannerDao = async function() {
    return await bannerModel.findAll();
};

module.exports.updateBannerDao = async function(bannerArr) {
    // 将表记录全部删除掉
    await bannerModel.destroy({
        truncate: true,
    });
    // 批量写入数据
    await bannerModel.bulkCreate(bannerArr);

    return await bannerModel.findAll();
};