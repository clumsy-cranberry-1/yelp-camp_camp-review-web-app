const express = require("express");
const router = express.Router();

// controllers
const reviewCtrl = require("../controllers/review-controller");

// models
const campgroundModel = require("../models/campground-model");
const reviewModel = require("../models/review-model");

// util
const catchAsyncError = require("../util/async-error");

// imported middleware
const { isLoggedIn, validateReview } = require("../middleware/middleware.js");

// ========================================= START OF CRUD =========================================
// ===== CREATE =====
router.post(
	"/campgrounds/:campId/reviews",
	isLoggedIn,
	validateReview,
	catchAsyncError(async (req, res, next) => {
		const campById = await campgroundModel.findById(req.params.campId);
		const newReview = new reviewModel(req.body);
		newReview.author = req.user._id;
		await newReview.save();
		campById.reviews.push(newReview);
		await campById.save();
		console.log(newReview);
		res.redirect(`/campgrounds/${campById._id}`);
	})
);

// ===== DELETE =====
router.delete(
	"/campgrounds/:campId/reviews/:reviewId",
	isLoggedIn,
	catchAsyncError(reviewCtrl.deleteReview)
);

module.exports = router;
