const asyncHandler = require('../middleware/async');
const systemConfig = require('../configs/system');
const notifyConfig = require('../configs/notify');
const ErrorResponse = require('../utils/ErrorResponse');
const jwt = require('jsonwebtoken');

const users_service = require('../services/users');

const middle_verifyToken = asyncHandler(async (req, res, next) => {
    // Get token
    let token = '';
    if (req.header('authorization')?.startsWith('Bearer')) {
        token = req.header('authorization').split(' ')[1]
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) return next(new ErrorResponse(401, notifyConfig.ERROR_NO_TOKEN));

    try {
        const data_decoded = jwt.verify(token, systemConfig.JWT_SECRET);
        // console.log("data: ", data_decoded);
        req.user = await users_service.listItems({ id: data_decoded.id }, { task: 'one' });
        next();
    } catch (error) {
        return next(new ErrorResponse(401, notifyConfig.ERROR_NO_TOKEN));
    }
});

module.exports = middle_verifyToken;