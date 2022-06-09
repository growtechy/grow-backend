
const User = require('../models/User');
const Task = require('../models/Task');
const notification = require('../models/Notification');

const getTask = async (req, res) => {
    try {

        let data;

        if (req.query.status != null) {
            data = await Task.find({ userid: req.user._id, farmId: req.query.farmId, status: req.query.status }).sort({ created_at: 'desc' });
        }
        else {
            data = await Task.find({ userid: req.user._id, farmId: req.query.farmId }).sort({ created_at: 'desc' });
        }


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

const addTask = async (req, res) => {
    try {

        req.body.projectedStart = dateFormatter(req.body.projectedStart);
        req.body.projectedEnd = dateFormatter(req.body.projectedEnd);
        req.body.actualStart = dateFormatter(req.body.projectedStart);
        req.body.actualEnd = dateFormatter(req.body.projectedEnd);
        req.body.userId = req.user._id;
        req.body.farmId = req.query.farmId;

        const data = await Task(req.body).save();

        var diffDays = req.body.actualEnd.getTime() - req.body.projectedStart.getTime();

        notification.insertNotification(req.user._id, `You have a new task: ${req.body.taskName.toUpperCase()}. It will take ${diffDays / (1000 * 3600 * 24)} days to complete. Visit your farm to carry out this task.`);

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
const editTask = async (req, res) => {
    try {

        req.body.projectedStart = dateFormatter(req.body.projectedStart);
        req.body.projectedEnd = dateFormatter(req.body.projectedEnd);
        req.body.actualStart = dateFormatter(req.body.actualStart);
        req.body.actualEnd = dateFormatter(req.body.actualEnd);
        req.body.userId = req.user._id;
        req.body.farmId = req.query.farmId;

        await Task.updateOne({ _id: req.params.id }, req.body);

        var diffDays = req.body.actualEnd.getTime() - req.body.actualStart.getTime();

        if (req.body.status === 'completed') {
            notification.insertNotification(req.user._id, `Congratulations!. Your task: ${req.body.taskName.toUpperCase()} has been completed. It took you ${diffDays / (1000 * 3600 * 24)} days.`);
        }

        notification.insertNotification(req.user._id, `Your updated task: ${req.body.taskName.toUpperCase()} will take ${diffDays / (1000 * 3600 * 24)} days to complete. Visit your farm to carry out this task.`);


        const data = await Task.find({ userId: req.user._id }).sort({ created_at: 'desc' });

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
const deleteTask = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id });

        const data = await Task.find({ userId: req.user._id }).sort({ created_at: 'desc' });

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


function dateFormatter(date) {
    return new Date(date + 'GMT+0');
}



module.exports = { getTask, addTask, editTask, deleteTask }