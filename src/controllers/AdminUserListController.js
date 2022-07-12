const Admin = require('../models/Admin');
const User = require('../models/User');
const sendMail = require('../mailer/mails');
const CropCategory = require('../models/CropCategories');
const Task = require('../models/Task');
const Portal = require('../models/Portal');
const notification = require('../models/Notification');


const getUserList = async (req, res) => {
    try {

        const data = await User.find().sort({ created_at: 'desc' });

        res.status(200).json({
            data,
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

const getThisUser = async (req, res) => {
    try {

        const data = await User.findOne({ _id: req.params.id });

        res.status(200).json({
            data,
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

const getAnalytics = async (req, res) => {
    try {

        // Number of farms..
        const farm = (await Portal.find({ userId: req.params.id })).length;
        const task = (await Task.find({ userId: req.params.id })).length;
        const scheduledTask = (await Task.find({ userId: req.params.id, status: 'scheduled' })).length;
        const inProgressTask = (await Task.find({ userId: req.params.id, status: 'in-progress' })).length;
        const completedTask = (await Task.find({ userId: req.params.id, status: 'completed' })).length;


        res.status(200).json({
            data: { farm, task, scheduledTask, inProgressTask, completedTask },
            message: 'Success'
        });


    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

const getActivity = async (req, res) => {
    try {

        const data = await notification.find({ userId: req.params.id });

        res.status(200).json({
            data,
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}


const getTask = async (req, res) => {
    try {

        const data = await Task.find({ userId: req.params.id });

        res.status(200).json({
            data,
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

module.exports = { getUserList, getThisUser, getAnalytics, getActivity, getTask }