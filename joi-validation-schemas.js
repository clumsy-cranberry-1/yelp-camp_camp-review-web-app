// Implement Joi validation library that allows you to build schemas to validate JavaScript objects
const Joi = require("joi");

module.exports.joiCampgroundSchema = Joi.object({
	title: Joi.string().trim().required(),
	location: Joi.string().required(),
	description: Joi.string().max(300).required(),
	price: Joi.number().integer().min(0).required(),
	images: Joi.string().required(),
});

module.exports.joiReviewSchema = Joi.object({
	comment: Joi.string().required(),
	rating: Joi.number().min(0).max(5).required(),
});

module.exports.joiUserSchema = Joi.object({
	username: Joi.string().alphanum().trim().required(),
	email: Joi.string().email().required(),
	password: Joi.string(),
});



