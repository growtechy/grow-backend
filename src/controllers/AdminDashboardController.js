const Admin = require('../models/Admin');
const User = require('../models/User');
const CropCategory = require('../models/CropCategories');
const FarmLocation = require('../models/FarmLocation');
const Notification = require('../models/Notification');
const GrowInMessage = require('../models/GrowInMessage');
const sendMail = require('../mailer/mails');
const smsSender = require('../mailer/sms');



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


const generalMessages = async (req, res) => {
    try {
        var getUser;

        if (req.body.value == 'all users') {
            getUser = await User.find();
        }

        if (req.body.value == 'active') {
            getUser = await User.find({ status: 'active' });
        }

        if (req.body.value == 'inactive') {
            getUser = await User.find({ status: 'inactive' });
        }


        if (req.body.email) {

            for (let i = 0; i < getUser.length; i++) {
                const element = getUser[i];

                const mailInfo = {
                    from: 'GrowNG <info@growng.company>',
                    to: element.email,
                    subject: req.body.subject,
                    template: 'regular',
                    'h:X-Mailgun-Variables': JSON.stringify({
                        message: req.body.message
                    }),
                    'h:Reply-To': 'no-reply@growng.company'
                };

                await sendMail(mailInfo);


            }
            await GrowInMessage({
                name: `${req.body.value.toUpperCase()} - ${getUser[0].fullName !== undefined
                    ? getUser[0].fullName
                    : getUser[0].name} & ${getUser.length - 1} others`,
                email: `${getUser[0].email} & ${getUser.length - 1} others`,
                subject: req.body.subject,
                message: req.body.message,
                status: 'sent'
            }).save();
        }
        if (req.body.sms) {
            for (let i = 0; i < getUser.length; i++) {
                const element = getUser[i];

                await smsSender.sendSMS(element.phoneNumber, req.body.message.replace(/<\/?[^>]+(>|$)/g, ''));
            }
        }
        if (req.body.notification) {
            for (let i = 0; i < getUser.length; i++) {
                const element = getUser[i];
                // if (element.playerId != null) {
                //     await pushnotification.notifyOneUser(
                //         element.playerId,
                //         `${req.body.message}`,
                //         `${req.body.subject}`
                //     );
                // }
            }
        }

        res.status(200).json({
            data: true,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
};


const sendMessages = async (req, res) => {
    try {
        var getUser;


        if (req.body.value == 'fanprofile') {
            getUser = await User.findOne({ _id: req.body._id });
        }


        if (req.body.email) {

            const mailInfo = {
                from: 'GrowNG <info@growng.company>',
                to: getUser.email,
                subject: req.body.subject,
                template: 'regular',
                'h:X-Mailgun-Variables': JSON.stringify({
                    message: req.body.message
                }),
                'h:Reply-To': 'no-reply@growng.company'
            };

            await sendMail(mailInfo);

            await GrowInMessage({
                name: `${getUser.fullName !== undefined ? getUser.fullName : getUser.name}`,
                email: getUser.email,
                subject: req.body.subject,
                message: req.body.message,
                status: 'sent'
            }).save();
        }
        if (req.body.sms) {
            await smsSender.sendSMS(getUser.phoneNumber, req.body.message.replace(/<\/?[^>]+(>|$)/g, ''));
        }
        if (req.body.notification) {
            // if (getUser.playerId != null) {
            //     await pushnotification.notifyOneUser(getUser.playerId, `${req.body.message}`, `${req.body.subject}`);
            // }
        }

        res.status(200).json({
            data: true,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.log(error.message);
        // await slacklog(error.message);
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
};

const userAccountState = async (req, res) => {
    try {
        if (req.body.accountStatus == 'NILL')
            return res.status(400).json({
                data: [],
                message: 'Please select account status'
            });

        // Get celebrity and Update Account State ...
        const updateFan = await User.updateOne({ _id: req.body._id }, { status: req.body.accountStatus });

        res.status(200).json({
            data: updateFan,
            message: `User account status set to ${req.body.accountStatus.toUpperCase()}`
        });
    } catch (error) {
        console.log(error.message);
        // await slacklog(error.message);
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
};

module.exports = { getMenu, getActivity, generalMessages, sendMessages, userAccountState }