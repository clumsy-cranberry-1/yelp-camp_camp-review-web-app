const mongoose = require("mongoose");
const reviewModel = require("./review-model");

const options = { toJSON: { virtuals: true } }; // https://mongoosejs.com/docs/tutorials/virtuals.html

const campgroundSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		location: {
			type: String,
		},
		geometry: {
			// refer to MongoDB GeoJSON & Mongoose GeoJSON
			type: {
				type: String,
				enum: ["Point"], // the String value must be equal to "Point"
				// required: true,
			},
			coordinates: {
				type: [Number],
				// required: true,
			},
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
		},
		images: [
			{
				type: String,
			},
		],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		reviews: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Review",
			},
		],
	},
	options
);

campgroundSchema.virtual("properties.mapboxPopupText").get(function () {
	return `<a href="/campgrounds/${this._id}">${this.title}</a><p>${this.location}</p><p>$${this.price} per person</p>`;
});

// When a campground is deleted, delete associated reviews from the "reviews" collection as well.
campgroundSchema.post("findOneAndDelete", async (element) => {
	if (element.reviews.length > 0) {
		await reviewModel.deleteMany({ _id: { $in: element.reviews } });
	}
});

module.exports = mongoose.model("Campground", campgroundSchema);
