
const User = require('../models/User');


const updateNotification = async (req, res) => {
    try {


        await User.updateOne({ _id: req.user._id }, {
            notificationSettings: [
                {
                    allowNotifications: req.body.allowNotifications, pushNotifications: req.body.pushNotifications, notificationSound: req.body.notificationSound
                }
            ]
        });


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


module.exports = { updateNotification }