// Implement Joi validation library that allows you to build schemas to validate JavaScript objects
const Joi = require("joi");

module.exports.joiCampgroundSchema = Joi.object({
	title:
		Joi.string().
			trim().
			required(),
	location:
		Joi.string()
			.required(),
	description:
		Joi.string()
			.max(300)
			.required(),
	price: Joi.number()
		.integer()
		.min(0)
		.required(),
	images:
		Joi.string().required(),
});

module.exports.joiReviewSchema = Joi.object({
	comment: Joi.string()
		.required()
		.max(2500),
	rating: Joi.number()
		.min(1)
		.max(5)
		.required(),
});

module.exports.joiUserSchema = Joi.object({
	username: Joi.string()
		.alphanum()
		.min(3)
		.max(30)
		.trim()
		.required(),
	email: Joi.string()
		.email()
		.required(),
	password: Joi.string()
		.regex(/^[a-zA-Z0-9]{3,30}$/)
		.required()
});



