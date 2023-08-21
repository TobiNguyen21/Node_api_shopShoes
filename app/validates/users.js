const { check } = require('express-validator');
const notify = require('../configs/notify');
const util = require('util');

const options = {
    username: { min: 3, max: 80 },
    password: { min: 8, max: 20 },
    roles: ['user', 'publisher', 'admin']
}

module.exports = {
    validator: () => {
        const msgErr = {
            username: util.format(notify.ERROR_USERNAME, options.username.min, options.username.max),
            email: util.format(notify.ERROR_EMAIL),
            role: util.format(notify.ERROR_ROLE),
            password: util.format(notify.ERROR_PASSWORD, options.password.min, options.password.max)
        }

        return [
            check('username').escape().matches(/^[a-zA-Z0-9_]+$/).isLength({ min: options.username.min, max: options.username.max }).withMessage(msgErr.username),
            check('email').matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).withMessage(msgErr.email),
            check('role').isIn(options.roles).withMessage(msgErr.role),
            check('password').isLength({ min: options.password.min, max: options.password.max }).withMessage(msgErr.password)
        ];

    }
}