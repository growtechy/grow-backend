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
