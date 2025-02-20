// 自定义错误
// 当错误发生的时候，我们捕获到发生的错误，然后抛出这个错误，让错误处理中间件捕获到这个错误，然后返回给前端

/**
 * 业务处理错误基类
 * 
 * @param { message } message 错误信息
 * @param { code } code 消息码
 */
class ServiceError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }

    // 方法  调用这个方法  返回给客户端一个格式
    toResponseJSON() {}
}

// throw new ServiceError('用户名不存在', 10001);


// 文件上传错误    413
const UploadError = class extends ServiceError {
    constructor(message) {
        super(message, 413);
    }
}
// 禁止访问错误  token 过期之类
const ForbiddenError = class extends ServiceError {
    constructor(message) {
        super(message, 401);
    }
}
// 验证错误
const ValidationError = class extends ServiceError {
    constructor(message) {
        super(message, 406);
    }
}
// 无资源错误   404
const NotFoundError = class extends ServiceError {
    constructor() {
        super('not found', 406);
    }
}
// 未知错误   （其他错误）
const UnkonwnError = class extends ServiceError {
    constructor() {
        super('server internal error', 500);
    }
}

module.exports = {
    UploadError,
    ForbiddenError,
    ValidationError,
    NotFoundError,
    UnkonwnError
}
