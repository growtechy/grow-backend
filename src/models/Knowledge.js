const mongoose = require('mongoose');

const KnowledgeSchema = mongoose.Schema({
    crop: {
        type: String,
        default: 'NULL'
    },
    module: {
        type: String,
        default: 'NULL'
    },
    title: {
        type: String,
        default: 'NULL'
    },
    subTitle: {
        type: String,
        default: 'NULL'
    },
    content: {
        type: String,
        default: 'NULL'
    },
    cropFile: {
        type: String,
        default: 'https://res.cloudinary.com/growng/image/upload/v1652778178/assets/green_icon_wzwmv1.png'
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

const Knowledge = mongoose.model('Knowledges', KnowledgeSchema);

module.exports = Knowledge;
