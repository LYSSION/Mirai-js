const errCode = require('../util/errCode');
const axios = require('axios');
const { URL } = require('url');
const errorHandler = require('../util/errorHandler');

/**
 * @description 校验 sessionKey，将一个 session 绑定到指定的 qq 上
 * @param {string} baseUrl    mirai-api-http server 的地址
 * @param {string} sessionKey 会话标识
 * @param {number} qq         qq 号
 * @returns {Object} 结构 { message, code }
 */
module.exports = async ({ baseUrl, sessionKey, qq }) => {
    try {
        // 拼接 auth url
        const url = new URL('/verify', baseUrl).toString();

        // 请求
        let {
            data: { msg: message, code },
        } = await axios.post(url, { sessionKey, qq });

        // 抛出 mirai 的异常，到 catch 中处理后再抛出
        if (code in errCode) {
            throw new Error(message);
        }
        return { message, code };
    } catch (error) {
        errorHandler(error);
    }

};
