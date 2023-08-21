const express = require('express');
const router = express.Router();

const middle_verifyToken = require('../middleware/verifyToken');
const middle_authorize = require('../middleware/authorize');

router.use('/product', require('./product'));
router.use('/category', require('./category'));
router.use('/users', middle_verifyToken, middle_authorize('admin'), require('./users'));
router.use('/auth', require('./auth'));

module.exports = router;
