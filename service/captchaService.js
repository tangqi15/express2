
const svgCaptcha = require('svg-captcha');

// 生成验证码逻辑
module.exports.getCaptchaService = async function() {
    const captcha = await svgCaptcha.create({
        size: 4,
        ignoreChars: 'iIll0Oo', // 验证码不出现的字符
        noise: 6, // 干扰线  6，
        color: 'red', // 颜色
    });    
    return captcha;
}