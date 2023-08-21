const MainModel = require('../models/user');
const ErrorResponse = require('../utils/ErrorResponse');

const notifyConfig = require('../configs/notify');
const SendEmail = require('../utils/sendEmail');

const crypto = require("crypto");

module.exports = {
    create: async (item) => {
        const user = await new MainModel(item).save();
        return await user.getSignedJwtToken();
    },
    login: async (email, password) => {
        const result = await MainModel.findByCredentials(email, password);
        if (result.err) {
            return new ErrorResponse(401, result.err);
        }
        return await result.user.getSignedJwtToken();
    },
    forgotPassword: async (email) => {
        const user = await MainModel.findOne({ email: email });
        if (!user) return new ErrorResponse(401, notifyConfig.ERROR_LOGIN.ERROR_EMAIL);

        const resetToken = await user.resetPassword();
        await user.save();

        //create resetURL
        const resetURL = `/api/v1/auth/resetPassword/${resetToken}`;
        const message = `Truy cập vào link để đổi pass : ${resetURL}`;

        try {
            await SendEmail({
                email: user.email,
                subject: "Thay đổi PassWord",
                message: message
            })
            return 'Vui lòng check email của bạn';
        } catch (err) {
            user.resetPassToken = undefined;
            user.resetPassTokenExp = undefined;
            await user.save();
            return 'Không thể gửi email , vui lòng thử lại';
        }
    },
    resetPassword: async ({ resetToken, password }) => {
        const hash_resetPassToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        const user = await MainModel.findOne({
            resetPassToken: hash_resetPassToken,
            resetPassTokenExp: { $gt: Date.now() }
        })

        if (!user) return new ErrorResponse(401, notifyConfig.ERROR_RESETPASSWORD);

        user.password = password;
        user.resetPassToken = undefined;
        user.resetPassTokenExp = undefined;

        await user.save();
        return user;
    }
}