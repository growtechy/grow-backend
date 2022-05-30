
const CropCategory = require('../models/CropCategories');


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

        }

        const result = await CropCategory({ name: req.body.name, image: uploadpath }).save();

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



module.exports = { getCropList, addCrops };
