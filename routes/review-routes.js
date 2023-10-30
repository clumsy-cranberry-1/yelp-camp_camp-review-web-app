const express = require("express");
const router = express.Router();

// controllers
const reviewCtrl = require("../controllers/review-controller");

// imported middleware
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware/middleware.js");


// CREATE
router.post(
	"/campgrounds/:campId/reviews",
	isLoggedIn,
	validateReview,
	reviewCtrl.createReview
);

// DELETE
router.delete(
	"/campgrounds/:campId/reviews/:reviewId",
	isLoggedIn,
	isReviewAuthor,
	reviewCtrl.deleteReview
);

module.exports = router;
