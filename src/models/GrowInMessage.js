const mongoose = require('mongoose');

const GrowInMessageSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'NULL'
    },
    email: {
        type: String,
        default: 'NULL'
    },
    subject: {
        type: String,
        default: 'NULL'
    },
    message: {
        type: String,
        default: 'NULL'
    },
    status: {
        type: String,
        default: 'not sent'
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

const InMessage = mongoose.model('GrowInMessage', GrowInMessageSchema);

module.exports = InMessage;
