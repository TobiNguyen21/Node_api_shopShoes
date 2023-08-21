const ErrorResponse = require('../utils/ErrorResponse');

const middle_authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(403, 'Bạn không có quyền truy cập'));
        }
        next();
    }
};

module.exports = middle_authorize;