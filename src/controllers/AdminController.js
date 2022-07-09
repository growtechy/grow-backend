const Admin = require('../models/Admin');
const User = require('../models/User');
const { adminRegisterValidations } = require('../helper/validator');
const sendMail = require('../mailer/mails');

const adminRegister = async (req, res) => {
    try {
        // Confirm request and validate data
        const { error } = adminRegisterValidations(req.body);
        if (error)
            return res.status(400).json({
                data: [],
                message: error.details[0].message
            });

        const newAdmin = await Admin(req.body).save();

        res.status(200).json({
            data: newAdmin,
            message: 'Success'
        });
    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
};


const adminLogin = async (req, res) => {
    try {
        const user = await Admin.findByCredentials(req.body.username, req.body.password);

        const token = await user.generateAuthToken();

        res.status(200).json({
            data: user,
            token: token,
            message: 'Success'
        });
    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const getAdmin = await Admin.findOne({ email: req.body.email });

        if (!getAdmin)
            return res.status(400).json({
                data: [],
                message: 'Email does not match our record'
            });

        // Send Mail for reset password...

        const mailInfo = {
            from: 'GrowNG <info@growng.company>',
            to: req.body.email,
            subject: 'Reset password link',
            template: 'regular',
            'h:X-Mailgun-Variables': JSON.stringify({
                message: `<p>Hello ${getAdmin.fullname},</p><p>Click on the link below to reset your password.</p><p><a href="${req
                    .body.link}?userkey=${btoa(getAdmin.email)}">${req.body.link}?userkey=${btoa(getAdmin.email)}</a></p>`
            }),
            'h:Reply-To': 'no-reply@growng.company'
        };

        await sendMail(mailInfo);

        res.status(200).json({
            data: getAdmin,
            message: `Reset password link sent to ${req.body.email}`
        });
    } catch (error) {
        // await slacklog(error.message);
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const getAdmin = await Admin.findOne({ email: req.body.email });

        if (!getAdmin)
            return res.status(400).json({
                data: [],
                message: 'Email does not match our record'
            });

        // Reset password...

        const salt = await bcrypt.genSalt(8);

        const hashedPassword = await bcrypt.hash(req.body.new_password, salt);

        await Admin.updateOne({ email: req.body.email }, { password: hashedPassword });

        res.status(200).json({
            data: getAdmin,
            message: `Password reset successful. Proceed to login`
        });
    } catch (error) {
        // await slacklog(error.message);
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
};


module.exports = { adminRegister, adminLogin, forgotPassword, resetPassword }