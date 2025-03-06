const jwt = require('jsonwebtoken');
const md5 = require('md5');


// 格式化要响应的数据
module.exports.formatResponse = function(code, msg, data) {
    return {
        "code": code,
        "msg": msg,
        "data": data,
        "status": "OK"
    }
}

// 解析token
module.exports.analysisToken = function(token) {
    const jwtToken = jwt.verify(token.split(" ")[1], md5(process.env.JWT_SECRET));
    return jwtToken;
}

// 梳理数组类型的响应数据
module.exports.handleDataPattern = function(data) {
    const arr = [];
    for (const i of data) {
        arr.push(i.dataValues)
    }
    return arr;
}
