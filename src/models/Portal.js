const mongoose = require('mongoose');

const PortalSchema = mongoose.Schema({
    userId: {
        type: String,
        default: 'NULL'
    },
    farmName: {
        type: String,
        default: 'NULL'
    },
    cropName: {
        type: String,
        default: 'NULL'
    },
    longitude: {
        type: String,
        default: 'NULL'
    },
    latitude: {
        type: String,
        default: 'NULL'
    },
    address: {
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

const Portal = mongoose.model('Portal', PortalSchema);

module.exports = Portal;
