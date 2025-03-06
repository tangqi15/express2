const { findBannerDao, updateBannerDao } = require("../dao/bannerDao")
const {handleDataPattern, formatResponse} = require("../utils/tool");

module.exports.findBannerService = async function() {
    const data = await findBannerDao();
    const result = handleDataPattern(data);
    return formatResponse(0, '', result);
}

module.exports.updateBannerService = async function(bannerArr) {
    const data = await updateBannerDao(bannerArr);
    const result = handleDataPattern(data);
    return formatResponse(0, '', result);
}

