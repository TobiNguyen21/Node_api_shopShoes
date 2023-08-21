const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/async')

const main_Controller = require(`../controllers/auth_Controller`);
const main_Validate = require('../validates/auth');
const middle_verifyToken = require('../middleware/verifyToken');

router.post('/register', main_Validate.validatorForRegister(), asyncHandler(main_Controller.register_Controller));
router.post('/login', main_Validate.validatorForLogin(), asyncHandler(main_Controller.login_Controller));
router.post('/forgotPassword', asyncHandler(main_Controller.forgotPassword_Controller));
router.post('/resetPassword/:resetToken', main_Validate.validatePassword(), asyncHandler(main_Controller.resetPassword_Controller));

router.get('/logout', middle_verifyToken, asyncHandler((req, res, next) => {
    if (req.user) {
        res.status(200).clearCookie('token').json({
            success: true
        })
    }
}));

router.get('/me', middle_verifyToken, asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}));

module.exports = router;
