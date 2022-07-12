const mongoose = require('mongoose');

const CropCategorySchema = mongoose.Schema({
    name: {
        type: String,
        default: 'NULL'
    },
    category: {
        type: String,
        default: 'NULL'
    },
    image: {
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

const CropCategory = mongoose.model('CropCategory', CropCategorySchema);

module.exports = CropCategory;
