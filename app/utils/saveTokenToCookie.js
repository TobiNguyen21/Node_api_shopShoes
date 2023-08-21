const systemConfig = require('../configs/system');

const saveTokenToCookie = (res, statusCode, token) => {
    const options = {
        expires: new Date(Date.now() + systemConfig.COOKIE_EXP * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    console.log("exp: ", options);

    res.status(statusCode).cookie('token', token, options)
        .json({
            success: true,
            token
        });
}

module.exports = saveTokenToCookie;