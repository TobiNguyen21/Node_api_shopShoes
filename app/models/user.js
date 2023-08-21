const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');
const systemConfig = require('../configs/system');
const notifyConfig = require('../configs/notify');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const schema = new mongoose.Schema({
    username: String,
    email: String,
    role: String,
    password: String,
    resetPassToken: String,
    resetPassTokenExp: String
});

// hash password before saving to database
schema.pre('save', function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

schema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, systemConfig.JWT_SECRET, { expiresIn: systemConfig.JWT_EXP });
};

schema.methods.resetPassword = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPassToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPassTokenExp = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

schema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email: email });
    if (!user) return { err: notifyConfig.ERROR_LOGIN.ERROR_EMAIL };

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return { err: notifyConfig.ERROR_LOGIN.ERROR_PASSWORD };
    return { user };

};

module.exports = mongoose.model(databaseConfig.col_users, schema);