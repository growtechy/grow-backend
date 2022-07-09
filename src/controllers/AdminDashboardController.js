const Admin = require('../models/Admin');
const User = require('../models/User');
const CropCategory = require('../models/CropCategories');
const FarmLocation = require('../models/FarmLocation');
const Notification = require('../models/Notification');
const sendMail = require('../mailer/mails');



const getMenu = async (req, res) => {
    try {

        const user = (await User.find()).length;
        const crops = (await CropCategory.find()).length;
        const farm = (await FarmLocation.find()).length;

        res.status(200).json({
            data: { user, crops, farm },
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}


const getActivity = async (req, res) => {
    try {
        var result = [];
        const data = await Notification.find().sort({ created_at: 'desc' });


        for (let i = 0; i < data.length; i++) {
            const element = data[i];

            const user = await User.findOne({ _id: element.userId }, { fullName: 1, avatar: 1 });

            result.push({
                notification: element,
                user
            });

        }

        res.status(200).json({
            data: Object.assign(result),
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

module.exports = { getMenu, getActivity }