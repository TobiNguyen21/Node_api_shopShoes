const { validationResult } = require('express-validator');
const ErrorResponse = require('../utils/ErrorResponse')

const validateReq = (req, res, next) => {
    const errors = validationResult(req).errors;
    if (errors.length !== 0) {
        next(new ErrorResponse(400, errors));
        return true;
    }
    return false;
};

module.exports = validateReq;