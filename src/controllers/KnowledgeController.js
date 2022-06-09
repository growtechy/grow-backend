
const User = require('../models/User');
const Knowledge = require('../models/Knowledge');

const getKnowledge = async (req, res) => {
    try {

        let data;

        if (req.query.crop != null) {
            data = await Knowledge.find({ crop: req.query.crop }).sort({ module: 'asc' });
        }
        else {
            data = await Knowledge.find().sort({ module: 'asc' });
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
const seedKnowledge = async (req, res) => {
    try {

        var result;

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




module.exports = { getKnowledge, seedKnowledge }