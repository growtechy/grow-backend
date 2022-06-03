
const User = require('../models/User');
const cloudder = require('../helper/cloudinary');

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


module.exports = { viewProfile, editProfile }