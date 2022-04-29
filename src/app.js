const express = require('express');

const app = express();

const cors = require('cors');

const fileupload = require('express-fileupload');

require('dotenv').config();

const PORT = process.env.PORT || 4400;

// Use Express Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileupload({ useTempFiles: true }));

// Declare Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/v1/farm', require('./routes/users/farm'));

app.use('/', (req, res) => {
	res.send('Welcome to Growng');
});

// Connect to Database
require('./config/database');

// Listen to the Server
if (NODE_ENV == 'local') {
	app.listen(PORT, () => console.log(`Listening to ${process.env.APP_URL}:${PORT}`));
}
app.listen();
