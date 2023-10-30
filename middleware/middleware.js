module.exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		// Passport: req.isAuthenticated() will return true if user is logged in
		return next();
	} else {
		req.flash("error", "Please log in to continue.");
		res.redirect("/login");
	}
};

// Server-side authentication (applies to Postman, etc.)
const reviewModel = require("../models/review-model");

module.exports.isReviewAuthor = async (req, res, next) => {
	try {
		const { reviewId } = req.params;
		const reviewById = await reviewModel.findById(reviewId);
		if (!reviewById.author.equals(req.user._id)) {
			req.flash("error", "You do not permission to perform this action.");
			res.redirect("campgrounds/${reviewId}");
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};

const campgroundModel = require("../models/campground-model");

module.exports.isCampgroundOwner = async (req, res, next) => {
	try {
		const { campId } = req.params;
		const campgroundById = await campgroundModel.findById(campId);
		if (!campgroundById.owner.equals(req.user._id)) {
			req.flash("error", "You do not have permission to perform this action.");
			res.redirect(`campgrounds/${campId}`);
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};

// Save requested/current URL in req.session in order to redirect the user to the original requested URL once authenticated/logged in. 
module.exports.saveReqUrl = (req, _, next) => {
	req.session.reqUrl = req.originalUrl;
	next();
};

// Joi validation middleware
// 1: validate campground
const { joiCampgroundSchema } = require("../joi-validation-schemas");

module.exports.validateCampground = (req, res, next) => {
	const joiValidationResult = joiCampgroundSchema.validate(req.body);
	const { error } = joiValidationResult;
	if (error) {
		req.flash("error", error.message);
		next(new Error(error.message));
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
		next(new Error(error.message));
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
		next(new Error(error.message));
	} else {
		next();
	}
};



