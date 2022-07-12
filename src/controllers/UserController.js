
const User = require('../models/User');
const cloudder = require('../helper/cloudinary');
const bcrypt = require('bcryptjs');

const viewProfile = async (req, res) => {
    try {

        const data = req.user;

        res.status(200).json({
            data: data,
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}


const editProfile = async (req, res) => {
    try {

        var uploadPath;

        uploadPath = req.user.avatar;

        if (req.files != null) {

            //TODO:: Upload file here

            const file = req.files.avatar;

            uploadPath = (await cloudder.profilePicture('avatar', file.tempFilePath, req.user._id)).secure_url;

        }

        req.body.avatar = uploadPath;


        await User.updateOne({ _id: req.user._id }, req.body);

        const data = await User.findOne({ _id: req.user._id });

        res.status(200).json({
            data: data,
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }

}


const changePassword = async (req, res) => {
    try {

        const user = await User.findById({ _id: req.user._id });

        // Check if password match
        if (req.body.newPassword != req.body.confirmPassword)
            return res.status(400).json({
                data: [],
                message: 'Password does not match'
            });

        const salt = await bcrypt.genSalt(8);

        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!isMatch)
            return res.status(400).json({
                data: [],
                message: 'Incorrect old password'
            });

        await User.updateOne({ _id: req.user._id }, { password: hashedPassword });


        res.status(200).json({
            data: user,
            message: 'Successfully changed'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}


module.exports = { viewProfile, editProfile, changePassword }