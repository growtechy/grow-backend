const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    userId: {
        type: String,
        default: 'NULL'
    },
    farmId: {
        type: String,
        default: 'NULL'
    },
    taskName: {
        type: String,
        default: 'NULL'
    },
    projectedStart: {
        type: Date,
        default: Date.now
    },
    projectedEnd: {
        type: Date,
        default: Date.now
    },
    actualStart: {
        type: Date,
        default: Date.now
    },
    actualEnd: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'in-progress'
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

const Task = mongoose.model('Tasks', TaskSchema);

module.exports = Task;
