
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
        req.body.userId = req.user._id;
        req.body.farmId = req.query.farmId;

        const data = await Task(req.body).save();

        var diffDays = req.body.projectedEnd.getTime() - req.body.projectedStart.getTime();

        notification.insertNotification(req.user._id, `You have a new task: ${req.body.taskName.toUpperCase()}. It will take a projected ${diffDays / (1000 * 3600 * 24)} days to complete. Visit your farm to carry out this task.`);

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
        var diffDays;
        var status = 'in-progress';
        req.body.projectedStart = dateFormatter(req.body.projectedStart);
        req.body.projectedEnd = dateFormatter(req.body.projectedEnd);
        req.body.actualStart = dateFormatter(req.body.actualStart);
        req.body.userId = req.user._id;
        req.body.farmId = req.query.farmId;



        if (req.body.actualEnd) {
            req.body.actualEnd = dateFormatter(req.body.actualEnd);
            diffDays = req.body.actualEnd.getTime() - req.body.actualStart.getTime();

            if (dateDifference(dateFormatter(req.body.actualEnd)) >= 0) {
                status = 'completed';
            }
            else {
                status = 'in-progress';
            }
        }
        else {
            diffDays = req.body.projectedEnd.getTime() - req.body.actualStart.getTime();
        }

        req.body.status = status;


        await Task.updateOne({ _id: req.params.id }, req.body);



        if (status === 'completed') {
            notification.insertNotification(req.user._id, `Congratulations!. Your task: ${req.body.taskName.toUpperCase()} has been completed. It took you ${diffDays / (1000 * 3600 * 24)} days.`);
        }

        notification.insertNotification(req.user._id, `Your updated task: ${req.body.taskName.toUpperCase()} will take a projected ${diffDays / (1000 * 3600 * 24)} days to complete. Visit your farm to carry out this task.`);


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


function dateDifference(date) {

    var todaydate = new Date();
    var comingdate = new Date(date);

    return todaydate.setHours(0, 0, 0, 0) - comingdate.setHours(0, 0, 0, 0);
}



module.exports = { getTask, addTask, editTask, deleteTask }