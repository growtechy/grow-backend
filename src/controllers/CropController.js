
const CropCategory = require('../models/CropCategories');
const cloudder = require('../helper/cloudinary');

const getCropList = async (req, res) => {
    try {

        const data = await CropCategory.find().sort({ created_at: 'asc' });

        res.status(200).json({
            data: data,
            message: `Success`
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

const addCrops = async (req, res) => {
    try {
        var uploadpath = '';

        if (req.files != null) {

            const file = req.files.image;

            uploadpath = (await cloudder.regularUpload('crop', file.tempFilePath, req.user._id)).secure_url;

        }

        req.body.image = uploadpath;

        const result = await CropCategory(req.body).save();

        res.status(200).json({
            data: result,
            message: `Success`
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

const updateCrop = async (req, res) => {
    try {

        const item = await CropCategory.findOne({ _id: req.params.id });

        var uploadpath = item.image;

        if (req.files != null) {

            const file = req.files.image;

            uploadpath = (await cloudder.regularUpload('crop', file.tempFilePath, req.user._id)).secure_url;

        }

        req.body.image = uploadpath;

        const data = await CropCategory.updateOne({ _id: req.params.id }, req.body);

        res.status(200).json({
            data,
            message: `Success`
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

const deleteCrop = async (req, res) => {
    try {

        const data = await CropCategory.deleteOne({ _id: req.params.id });

        res.status(200).json({
            data,
            message: `Success`
        });

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}


module.exports = { getCropList, addCrops, updateCrop, deleteCrop };
