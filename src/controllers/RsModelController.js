const { google } = require('googleapis');

const fetchTrainingData = async (req, res) => {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: "./credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets"
        });

        // Create client instance for auth
        const client = await auth.getClient();

        // Instance of Google Sheet API...

        const googleSheets = google.sheets({
            version: "v4", auth: client
        });


        //  Get metadata about spreadsheet...

        const metaData = await googleSheets.spreadsheets.get({
            auth, spreadsheetId: process.env.SPREADSHEETID,
        });


        //  Read Rows from spreadsheet...
        const getRows = await googleSheets.spreadsheets.values.get({
            auth, spreadsheetId: process.env.SPREADSHEETID, range: "RS ML Training DB"
        });


        res.status(200).json({
            data: getRows.data,
            message: 'success'
        });


    } catch (error) {
        res.status(400).json({
            data: [],
            message: error.message
        });
    }
}

module.exports = { fetchTrainingData };
