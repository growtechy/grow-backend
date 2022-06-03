const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    userId: {
        type: String,
        default: 'NULL'
    },
    information: {
        type: String,
        default: 'NULL'
    },
    status: {
        type: String,
        default: 'unread'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

NotificationSchema.statics.insertNotification = async (userId, information) => {
    await Notification({ userId, information }).save();
}

const Notification = mongoose.model('Notifications', NotificationSchema);

module.exports = Notification;

