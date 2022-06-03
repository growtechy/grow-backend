const notification = require('../models/Notification');


const fetchNotifications = async (req, res) => {
    try {

        if (req.query.status != null) {
            await notification.updateMany({ userId: req.user.id }, { status: 'read' });
        }

        const data = await notification.find({ userId: req.user.id }).sort({ created_at: 'desc' });


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


module.exports = { fetchNotifications }