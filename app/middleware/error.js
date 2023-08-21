const ErrorResponse = require('../utils/ErrorResponse')
const notify = require('./../configs/notify');

const errorHandler = (err, req, res, next) => {
    console.log(err.name.red);
    console.log(err);
    let error = { ...err }

    if (err.name == "CastError") {
        console.log("hello");
        let message = notify.ERROR_CASTERROR;
        error = new ErrorResponse(404, message);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "SEVER ERROR"
    })
}

module.exports = errorHandler;;