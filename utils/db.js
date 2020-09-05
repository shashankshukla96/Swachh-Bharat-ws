const mongoose = require('mongoose');
const env = require('../config')
// const configuration = require('../config/config');
const makeDbConnection = () => {
	mongoose
		.connect(`${env.dev.DB.CONNECTION_URI}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => console.log('Connected to the database'))
		.catch((err) => {
			console.error('Something went wrong while connecting to the database.', err);
		});
	mongoose.Promise = global.Promise;
};
module.exports = makeDbConnection;
