// establish mongo database connection
const mongoose = require("mongoose");
const server = "127.0.0.1:27017";
const database = "yelp-camp";

const connectMongoDB = () => {
	mongoose
		.connect(`mongodb://${server}/${database}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => console.log("Database Connection OK."))
		.catch((error) => {
			console.log("Database Connection Failed. ERROR: " + error)
		}
		);
};

module.exports = connectMongoDB;