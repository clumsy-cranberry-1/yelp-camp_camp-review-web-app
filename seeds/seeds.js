/* Seed the local database for testing purposes. Creates fake listings of camp sites with a location, images, descriptions and pricing.
** To seed the database, run seeds.js before running app.js
*/

const mongoose = require("mongoose");
const { title_part1, title_part2 } = require("./titles");
const { cities } = require("./cities");
const { descriptions } = require('./descriptions');
const images = require("./images");
const campgroundModel = require("../models/campground-model");

const server = "127.0.0.1:27017";
const database = "yelp-camp";

mongoose
	.connect(`mongodb://${server}/${database}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log("Connection to database SUCCESSFUL."))
	.catch((err) => console.log("Connection to database FAILED.", err));

mongoose.connection.on("error", (err) => {
	console.log(err);
});

// ------------------------------------------------------------------------------------------------

const seedDB = async function () {
	await campgroundModel.deleteMany({}); // deletes all existing campgrounds in the db
	for (let i = 0; i <= 80; i++) {
		// retrieve a random value from a given array. Pass an array as the argument. 
		const randomArrayValue = (array) =>
			array[Math.floor(Math.random() * array.length)];

		const randomIndex1000 = Math.floor(Math.random() * 1000); // the array in "cities.js" has 1000 objects

		const randomPrice = Math.floor(Math.random() * 80) + 20;

		const camp = new campgroundModel({
			title: `${randomArrayValue(title_part1)} ${randomArrayValue(title_part2)}`,
			location: `${cities[randomIndex1000].city}, ${cities[randomIndex1000].state}`,
			geometry: {
				type: "Point",
				coordinates: [
					cities[randomIndex1000].longitude,
					cities[randomIndex1000].latitude,
				],
			},
			description:
				randomArrayValue(descriptions),
			images: [
				`${randomArrayValue(images)}`,
				`${randomArrayValue(images)}`,
				`${randomArrayValue(images)}`,
			], // -> adds 3 images to the array eg. images[30], images[6], images[9]
			price: randomPrice,
			owner: "60cceb037155ac01e8b6a29c", // NB: first create a user, then copy _id of user
		});
		await camp.save();
		// console.log(camp);
	}
};

seedDB().then(() => console.log("Database Populated Successfully.")); 

