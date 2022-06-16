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
app.use('/public', express.static('public'));
app.use('/api/v1/farm', require('./routes/users/farm'));
app.use('/api/v1/auth', require('./routes/auth/main'));
app.use('/api/v1/crop', require('./routes/crop/index'));
app.use('/api/v1/profile', require('./routes/profile/index'));
app.use('/api/v1/settings', require('./routes/settings/index'));
app.use('/api/v1/task', require('./routes/task/index'));
app.use('/api/v1/knowledge', require('./routes/knowledge/index'));
app.use('/api/v1/notification', require('./routes/notification/index'));
app.use('/api/v1/rs-training', require('./routes/rs/index'));

app.use('/', (req, res) => {
	res.send('Welcome to Growng');
});

// Connect to Database
require('./config/database');

// Listen to the Server
if (process.env.NODE_ENV == 'local') {
	app.listen(PORT, () => console.log(`Listening to ${process.env.APP_URL}:${PORT}`));
}
app.listen();
