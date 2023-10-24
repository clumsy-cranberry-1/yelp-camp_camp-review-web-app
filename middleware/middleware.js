module.exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		// Passport: req.isAuthenticated() will return true if user is logged in
		return next();
	} else {
		req.flash("error", "Please log in to continue.");
		res.redirect("/login");
	}
};

// Save the requested/current URL in req.session in order to redirect the user to the requested URL once authenticated/logged in. 
module.exports.saveReqUrl = (req, res) => {
	return req.session.reqUrl = req.path;
}

// Joi validation middleware
// 1: validate campground
const { joiCampgroundSchema } = require("../joi-validation-schemas");

module.exports.validateCampground = (req, res, next) => {
	const joiValidationResult = joiCampgroundSchema.validate(req.body);
	const { error } = joiValidationResult;
	if (error) {
		req.flash("error", error.message);
		next(new Error(error.message))
		res.redirect(req.path);
	} else {
		next();
	}
};

// 2: validate review
const { joiReviewSchema } = require("../joi-validation-schemas");

module.exports.validateReview = (req, res, next) => {
	const joiValidationResult = joiReviewSchema.validate(req.body);
	const { error } = joiValidationResult;
	if (error) {
		req.flash("error", error.message);
		next(new Error(error.message))
		res.redirect(req.path);
	} else {
		next();
	}
};

// 3: validate user
const { joiUserSchema } = require("../joi-validation-schemas");

module.exports.validateUser = (req, res, next) => {
	const joiValidationResult = joiUserSchema.validate(req.body);
	const { error } = joiValidationResult;
	if (error) {
		req.flash("error", error.message);
		res.redirect(req.path);
		next(new Error(error.message))
	} else {
		next();
	}
};



