const jwt = require('jsonwebtoken');
const md5 = require('md5');


// 响应格式
// {
//     "code": code,
//     "mas": "登录成功",
//     "data": data,
// }

// 格式化要响应的数据

module.exports.formatResponse = function(code, msg, data) {
    return {
        "code": code,
        "msg": msg,
        "data": data,
        "status": "OK"
    }
}


module.exports.analysisToken = function(token) {
    // 解析
    const jwtToken = jwt.verify(token.split(" ")[1], md5(process.env.JWT_SECRET));
    return jwtToken;
}