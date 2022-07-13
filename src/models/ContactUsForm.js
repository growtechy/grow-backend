const mongoose = require('mongoose');

const ContactusFormSchema = mongoose.Schema({
    fullname: {
        type: String,
        default: 'NULL'
    },
    email: {
        type: String,
        default: 'NULL'
    },
    message: {
        type: String,
        default: 'NULL'
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

const ContactusForm = mongoose.model('ContactusForms', ContactusFormSchema);

module.exports = ContactusForm;
