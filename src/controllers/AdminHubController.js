const { createKnowledgeHub } = require('../helper/validator');
const Knowledge = require('../models/Knowledge');
const cloudder = require('../helper/cloudinary');


const allHub = async (req, res) => {
    try {

        const data = await Knowledge.find().sort({ crop: 'asc' });

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

const createHub = async (req, res) => {
    try {

        let result;
        let uploadPath = '';

        const { error } = createKnowledgeHub(req.body);
        if (error)
            return res.status(400).json({
                data: [],
                message: error.details[0].message
            });

        if (req.files != null) {

            const file = req.files.cropFile;

            uploadPath = (await cloudder.regularUpload('knowledge-hub', file.tempFilePath, req.user._id)).secure_url;

        }

        req.body.cropFile = uploadPath;

        const data = await Knowledge.findOne({ module: req.body.module, crop: req.body.crop });

        if (data) {
            // Update
            result = await Knowledge.updateOne({ module: req.body.module, crop: req.body.crop }, req.body)
        }
        else {
            // Insert
            result = await Knowledge(req.body).save();
        }

        res.status(200).json({
            data: result,
            message: 'Success'
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

const updateHub = async (req, res) => {
    try {

        // Check if there is a file...

        var uploadPath;

        const item = await Knowledge.findOne({ _id: req.params.id });

        uploadPath = item.cropFile;

        if (req.files != null) {

            const file = req.files.cropFile;

            uploadPath = (await cloudder.regularUpload('knowledge-hub', file.tempFilePath, req.user._id)).secure_url;

        }

        req.body.cropFile = uploadPath;

        const data = await Knowledge.updateOne({ _id: req.params.id }, req.body)

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

const deleteHub = async (req, res) => {
    try {

        const data = await Knowledge.deleteOne({ _id: req.params.id });

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

module.exports = { allHub, createHub, updateHub, deleteHub }