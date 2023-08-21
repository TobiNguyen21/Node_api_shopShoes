require("dotenv").config();

module.exports = {
    prefixAdmin: 'adminCCC',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXP: '1h',
    COOKIE_EXP: 30,

    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: 465,
    SMTP_EMAIL: process.env.EMAIL,
    SMTP_PASS: process.env.EMAIL_PASS,
    FORM_EMAIL: process.env.EMAIL,
    FORM_NAME: 'Shop'
};