const campgroundModel = require("../models/campground-model.js");
// mapbox: create client/service
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingService = mbxGeocoding({
	accessToken: process.env.MAPBOX_TOKEN,
});

// ========================================= START OF CRUD =========================================
// ===== CREATE =====
module.exports.renderNewCampgroundForm = (req, res) => {
	res.render("pages/camps/new.ejs");
};

module.exports.createCampground = async (req, res, next) => {
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
			req.flash("success", "Campground added successfully.");
			res.redirect(`/campgrounds/${newCampground._id}`);
		});
};

// ===== READ =====
module.exports.home = (req, res, next) => {
	res.render("pages/camps/home.ejs");
};

module.exports.index = async (req, res, next) => {
	const allCampgrounds = await campgroundModel.find({});
	res.render("pages/camps/index.ejs", { allCampgrounds });
};

module.exports.viewCampgroundDetails = async (req, res, next) => {
	const campById = await campgroundModel
		.findById(req.params.campId)
		.populate({ path: "reviews", populate: { path: "author" } });
	/* NOTE ON .populate: the "reviews" property of the *campground* only holds the ObjectId of each 
	review, so, in order to access the entire content (incl. the author) for "reviews", we need to 
	populate the "reviews" property with "author" */
	res.render("pages/camps/details.ejs", { campById });
};

// ===== UPDATE =====
module.exports.renderEditCampgroundForm = async (req, res, next) => {
	const campById = await campgroundModel.findById(req.params.campId);
	res.render("pages/camps/edit", { campById });
};

module.exports.updateCampground = async (req, res, next) => {
	const campById = await campgroundModel.findById(req.params.campId);
	await campgroundModel.findByIdAndUpdate(campById, req.body, {
		runValidators: true,
	});
	req.flash("success", "Campground Edited Successfully");
	res.redirect(`/campgrounds/${campById._id}`);
};

// ===== DELETE =====
module.exports.deleteCampground = async (req, res, next) => {
	await campgroundModel.findByIdAndDelete(req.params.campId);
	res.redirect("/campgrounds");
};
