const express = require("express");
const router = express.Router();

// controllers
const reviewCtrl = require("../controllers/review-controller");

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
	catchAsyncError(reviewCtrl.createReview)
);

// ===== DELETE =====
router.delete(
	"/campgrounds/:campId/reviews/:reviewId",
	isLoggedIn,
	catchAsyncError(reviewCtrl.deleteReview)
);

module.exports = router;
