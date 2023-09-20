const userModel = require("../models/user-model.js");
const passport = require("passport");

module.exports.renderRegisterUserForm = (req, res, next) => {
	res.render("pages/users/register.ejs");
};

module.exports.registerUser = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new userModel({ email, username });
		const registeredUser = await userModel.register(user, password);
		// this will run if registering the new user is a success:
		console.log(registeredUser);
		req.flash(
			"success",
			"Your account has been created successfully. You may log in using your username and password"
		);
		res.redirect("/login");
	} catch (error) {
		req.flash("error", error.message);
		console.log(error);
		res.redirect("/register");
	}
};

module.exports.renderLoginForm = (req, res, next) => {
	res.render("pages/users/login.ejs");
};

module.exports.logUserOut = (req, res, next) => {
	req.logout();
	res.redirect("/campgrounds");
};
