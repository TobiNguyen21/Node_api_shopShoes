const { check } = require('express-validator');
const notify = require('../configs/notify');
const util = require('util');

const options = {
    name: { min: 3, max: 80 },
    description: { min: 10, max: 500 },
}

module.exports = {
    validator: () => {
        const msgErr = {
            name: util.format(notify.ERROR_NAME, options.name.min, options.name.max),
            description: util.format(notify.ERROR_DESCRIPTION, options.description.min, options.description.max)
        }

        return [
            check('name').escape().matches(/^[\p{L}0-9 ]+$/u).isLength({ min: options.name.min, max: options.name.max }).withMessage(msgErr.name),
            check('description').isLength({ min: options.description.min, max: options.description.max }).withMessage(msgErr.description)
        ];

    }
}