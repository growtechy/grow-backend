

const projectedHarvestOutput = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

const inputProjection = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

module.exports = { projectedHarvestOutput, inputProjection };
