const campgroundModel = require("../models/campground-model.js");
// mapbox: create client/service
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingService = mbxGeocoding({
	accessToken: process.env.MAPBOX_TOKEN,
});
const expressError = require("../util/express-error.js");


// NOTE ABOUT EXPRESS ERRORS
// For errors returned from asynchonous functions invoked by route handlers and middleware, you must pass them to the next() function, where Express will catch and process them.


// =============== START OF CRUD OPERATIONS ===============
// ===== CREATE =====
module.exports.renderNewCampgroundForm = (req, res) => {
	res.render("pages/camps/new.ejs");
};

module.exports.createCampground = async (req, res, next) => {
	try {
		// mapbox code
		await geocodingService
			.forwardGeocode({
				query: req.body.location,
				limit: 1,
			})
			.send()
			.then(async (response) => {
				const match = response.body;
				const mapboxGeometry = match.features[0].geometry;

				// mongoose code
				const newCampground = new campgroundModel(req.body);
				newCampground.owner = req.user._id;
				newCampground.geometry = mapboxGeometry;
				await newCampground.save();
				req.flash("success", "Campground successfully added.");
				res.redirect(`/campgrounds/${newCampground._id}`);
			});
	} catch (error) {
		next(error);
	}
};

// ===== READ =====
module.exports.home = (req, res, next) => {
	res.render("pages/camps/home.ejs");
};

module.exports.index = async (req, res, next) => {
	try {
		const allCampgrounds = await campgroundModel.find({});
		res.render("pages/camps/index.ejs", { allCampgrounds });
	} catch (error) {
		next(new expressError(500, "We're sorry, we could not process your request at this time. Please try again later."));
	}
};

module.exports.viewCampgroundDetails = async (req, res, next) => {
	try {
		const campById = await campgroundModel
			.findById(req.params.campId)
			.populate({ path: "reviews", populate: { path: "author" } });
		/* NOTE on .populate: the "reviews" property of the *campground* only holds the ObjectId of each review, so, in order to access the entire content (incl. the author) for "reviews", we need to 
		populate the "reviews" property with "author" */
		if (!campById) {
			return next(new expressError(404, "PAGE NOT FOUND. We're sorry, we couldn't find the page you requested."));
		}
		res.render("pages/camps/details.ejs", { campById });
	} catch (error) {
		next(error);
	}
};

// ===== UPDATE ===== 
module.exports.renderEditCampgroundForm = async (req, res, next) => {
	try {
		const campById = await campgroundModel.findById(req.params.campId);
		if (!campById) {
			return next(new expressError(404, "PAGE NOT FOUND. We're sorry, we couldn't find the page you requested."));
		}
		res.render("pages/camps/edit", { campById });
	} catch (error) {
		next(error);
	}
};

module.exports.updateCampground = async (req, res, next) => {
	try {
		const campById = await campgroundModel.findById(req.params.campId);
		if (!campById) {
			return next(new expressError(404, "PAGE NOT FOUND. We're sorry, we couldn't find the page you requested."));
		}
		await campgroundModel.findByIdAndUpdate(campById, req.body, {
			runValidators: true,
		});
		res.redirect(`/campgrounds/${campById._id}`);
	} catch (error) {
		next(error);
	}
};

// ===== DELETE =====
module.exports.deleteCampground = async (req, res, next) => {
	try {
		await campgroundModel.findByIdAndDelete(req.params.campId);
		res.redirect("/campgrounds");
	} catch (error) {
		next(error);
	}
};
