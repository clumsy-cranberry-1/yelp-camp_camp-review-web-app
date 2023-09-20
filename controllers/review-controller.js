const campgroundModel = require("../models/campground-model");
const reviewModel = require("../models/review-model.js");

module.exports.createReview = async (req, res, next) => {
	const campById = await campgroundModel.findById(req.params.campId);
	const newReview = new reviewModel(req.body);
	newReview.author = req.user._id;
	await newReview.save();
	campById.reviews.push(newReview);
	await campById.save();
	console.log(newReview);
	res.redirect(`/campgrounds/${campById._id}`);
};

module.exports.deleteReview = async (req, res, next) => {
	const { campId, reviewId } = req.params;
	const campById = await campgroundModel.findById(campId);
	await campgroundModel.findByIdAndUpdate(
		campId,
		{ $pull: { reviews: reviewId } }, // pull "reviewById" from the "reviews" array in the "Campground" model
		{ new: true }
	);
	await reviewModel.findByIdAndDelete(reviewId);
	res.redirect(`/campgrounds/${campById._id}`);
};
