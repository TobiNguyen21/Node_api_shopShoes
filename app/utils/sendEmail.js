const nodemailer = require("nodemailer");
const systemConfig = require('../configs/system');

const SendEmail = async (options) => {
    let transporter = nodemailer.createTransport({
        host: systemConfig.SMTP_HOST,
        port: systemConfig.SMTP_PORT,
        secure: true,
        auth: {
            user: systemConfig.SMTP_EMAIL,
            pass: systemConfig.SMTP_PASS
        }
    });

    try {
        let info = await transporter.sendMail({
            from: `${systemConfig.FORM_NAME} <${systemConfig.FORM_EMAIL}>`,
            to: options.email,
            subject: options.subject,
            text: options.message
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

module.exports = SendEmail;