const Admin = require('../models/Admin');
const User = require('../models/User');
const sendMail = require('../mailer/mails');



const getUserList = async (req, res) => {
    try {

        const data = await User.find().sort({ created_at: 'desc' });

        res.status(200).json({
            data,
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

const getThisUser = async (req, res) => {
    try {

        const data = await User.findOne({ _id: req.params.id });

        res.status(200).json({
            data,
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

module.exports = { getUserList, getThisUser }