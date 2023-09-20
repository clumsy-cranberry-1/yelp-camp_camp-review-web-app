module.exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		// Passport: req.isAuthenticated() will return true if user is logged in
		return next();
	} else {
		req.flash("error", "Please log in to continue.");
		res.redirect("/login");
	}
};

// Joi validation middleware
// 1: validate campgrounds
const { joiCampgroundSchema } = require("../joi-validation-schemas");
module.exports.validateCampground = (req, res, next) => {
	const joiValidationResult = joiCampgroundSchema.validate(req.body);
	console.dir(joiValidationResult);
	const { error } = joiValidationResult;
	if (error) {
		console.log("Joi_" + error);
		req.flash("error", error.message);
		res.redirect(req.path);
	} else {
		next();
	}
};

// 2: validate reviews
const { joiReviewSchema } = require("../joi-validation-schemas");
module.exports.validateReview = (req, res, next) => {
	const joiValidationResult = joiReviewSchema.validate(req.body);
	const { error } = joiValidationResult;
	if (error) {
		console.log("Joi_" + error);
		req.flash("error", error.message);
		res.redirect(req.path);
	} else {
		next();
	}
};

// 3: validate users
const { joiUserSchema } = require("../joi-validation-schemas");
module.exports.validateUser = (req, res, next) => {
	const joiValidationResult = joiUserSchema.validate(req.body);
	const { error } = joiValidationResult;
	if (error) {
		console.log("Joi_" + error);
		req.flash("error", error.message);
		res.redirect(req.path);
	} else {
		next();
	}
};



